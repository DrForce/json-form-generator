var theme_name = "theme";
var number_elem = 0;
var page_name = '';

function json_generator_form(json){
    page_name = json['name'];

    $('body').on('change','[data-name]',function(){
        localStorage[page_name+'_'+$(this).attr('data-name')] = $(this).val();
    });

    $('body').on('click','[data-type="submit"]',function(){
        var to_delete = [], to_send = [];
        if(localStorage.length>0){
            for(var key in localStorage){
                if(key.search(page_name) != -1){
                    if(localStorage[key] == 'delete'){
                        to_delete.push(key);
                    }else{
                        var item = {};
                        item[key]=localStorage[key];
                        to_send.push(item);
                    }
                    localStorage.removeItem(key);
                }
            }
            console.log(to_send);
        }
    });

    for( var i in json['forms'] ){
        var form = json['forms'][i];
        $('body').append(create_form(form));
        for( var j in form['rows'] ){
            var row = form['rows'][j];
            var row_style = '';
            if(row['style'] != null && row['style'] != ''){
                row_style = 'style="'+row['style']+'"';
            }
            $('form').last().append('<div class="row" '+row_style+'></div>');
            for( var k in row['content']){
                var item = row['content'][k];
                paste_element(item);
            }
        }
    }
}

function check_options(item){
    if(item['class'] == null || item['class'] == ''){
        if(styles[item['type']] != null){
            item['class'] = 'class="'+styles[item['type']]+'"';
        }else{
            item['class'] = '';
        }
    }else{
        item['class'] = 'class="'+item['class']+'"';
    }
    if(item['style'] == null || item['style'] == ''){
        item['style'] = '';
    }else{
        item['style'] = 'style="'+item['style']+'"';
    }
    if(item['value'] == null || item['value'] == ''){
        item['value'] = '';
    }else{
        item['value'] = 'value="'+item['value']+'"';
    }
    var local_value = localStorage.getItem(page_name+'_'+item['name']);
    if(local_value != null){
        item['value'] = 'value="'+local_value+'"';
    }
    if(item['name'] == null || item['name'] == ''){
        item['name'] = '';
    }else{
        item['name'] = 'data-name="'+item['name']+'"';
    }
    return item;
}

function paste_element(item, to){
    var to_element = null;
    var current_item = null;
    item = check_options(item);
    current_item = window['create_'+item['type']](item);
    if(current_item != false && current_item != null){
        if(item['content'] != null){
            to_element = number_elem;
        }
        if(to != null){
            current_item.appendTo($('[data-id='+to+']'));
        }else{
            current_item.appendTo($('.row').last());
        }
        if(item['action'] != null){
            attach_function(item,current_item);
        }
        for(var d in item['content']){
            paste_element(item['content'][d], to_element);
        }
    }
    number_elem++;
}

function attach_function(item, element){
    var func = item['action'];
    $(element).on(item['action-event'], function() {
        window[func](element);
    });
}