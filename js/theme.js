var styles = {
    'input': 'main_style_input',
    'name_input': 'name-input',
    'datepicker': 'main_style_input',
    'headline': 'name_block fix_width_12',
    'dropdown': 'drop_down_list',
    'textarea': 'text_area_input',
    'image_input': 'body_file_btn',
    'button': 'add_btn',
    'submit': 'add_btn',
    'add_multiply': 'add_btn',
    'multiply_delete': 'add_btn'
}

function create_form(options){
    return $('<form '+options['class']+' method="'+options['method']+'" action="'+options['action']+'"></form>');
}

function create_name_input(options){
    return $('<div '+options['class']+' '+options['style']+'>'+options['title']+'</div>');
}

function create_input(options){
    var placeholder = '';
    if(options['placeholder'] != null && options['placeholder'] != ''){
        placeholder = 'placeholder= "'+options['placeholder']+'"';
    }
    return $('<input '+options['class']+' '+options['name']+' '+placeholder+' '+options['value']+' '+options['style']+'/>')
}

function create_submit(options){
    var inner_text = '';
    if(options['text'] != null && options['text'] != ''){
        inner_text = options['text'];
    }else{
        inner_text = 'Сохранить';
    }
    return $('<button type="button" '+options['class']+' '+options['style']+' data-type="submit">'+inner_text+'</button>')
}

function create_datepicker(options){
    var timepicker = false;
    if(options['timepicker'] != null && options['style'] == true){
        timepicker = true;
    }
    var datepicker = $('<input '+options['class']+' '+options['name']+' id="datepicker-'+number_elem+'" '+options['value']+' '+options['style']+'/><div class="calendar"></div>')
    datepicker.datetimepicker({
        lang:'ru',
        format: options['format'],
        timepicker: timepicker
    });
    return datepicker;
}

function create_headline(options){
    return $('<div '+options['class']+' '+options['style']+'><div>'+options['title']+'</div></div>')
}

function create_dropdown(options){
    var result =  '<div '+options['class']+' '+options['style']+'>' +
        '<input type="hidden" '+options['name']+'> ' +
        '<div class="click_drop_down_list"></div> ' +
        '<span></span> ' +
        '<ul class="drop_list"> ';
    for(var i in options['elements']){
        result = result+ '<li id_select="'+i+'">'+options['elements'][i]+'</li>'
    }
    result = result+'</ul></div>';
    return $(result);
}

function create_checkbox(options){
    return $('<div '+options['class']+' '+options['style']+'>' +
        '<label for="checkbox-'+number_elem+'" class="modal_checkbox"> ' +
        '<input type="'+options['check_type']+'" '+options['name']+' class="checkbox_landing" id="checkbox-'+number_elem+'" '+options['value']+'>' +
        '<div class="pseudo_checkbox"></div> ' +
        '<div class="option_image"></div> ' +
        '</label> ' +
        '<div class="indent"></div> ' +
        '<div class="checkbox_text">'+options['title']+'</div>' +
        '</div>')
}

function create_textarea(options){
    return $('<textarea '+options['class']+' '+options['name']+' '+options['style']+'></textarea>')
}

function create_div(options){
    var data_id = '';
    if(options['content'] != null){
        data_id = 'data-id="'+number_elem+'"';
    }
    return $('<div '+options['class']+' '+data_id+' '+options['style']+'></div>')
}

function create_image_input(options){
    return $('<div class="drop_file" '+options['name']+' '+options['style']+'>' +
        'Перетащите файлы сюда или' +
        '<div class="body_file_btn">' +
        '<input type="file">' +
        '<div class="add_file">Выберите на компьютере</div>' +
        '</div>' +
        '</div>')
}

function create_modal(options){
    return $('<div class="wrapper_modal_window">' +
        '<form class="window modal_window" data-id="'+number_elem+'" modal="'+options['modal']+'">' +
        '<div class="name_block fix_width_21">'+options['title']+'</div>' +
        '<div class="modal_close"></div>' +
        '</form>' +
        '</div>')
}

function create_button(options){
    var inner_text = '';
    if(options['text'] != null && options['text'] != ''){
        inner_text = options['text'];
    }
    var modal = '';
    if(options['modal'] != null && options['modal'] != ''){
        modal = 'modal="'+options['modal']+'"';
    }
    var button_type = 'button';
    if(options['button_type'] != null && options['button_type'] != ''){
        button_type = options['button_type'];
    }
    return $('<button type="'+button_type+'" '+options['class']+' '+options['style']+' '+modal+'>'+inner_text+'</button>')
}

function create_add_multiply(options){
    var inner_text = '';
    if(options['text'] != null && options['text'] != ''){
        inner_text = options['text'];
    }
    return $('<button type="button" '+options['class']+' '+options['style']+' data-multiply="'+options['multiply_to']+'">'+inner_text+'</button>')
}

function create_multiply_delete(options){
    var inner_text = '';
    if(options['text'] != null && options['text'] != ''){
        inner_text = options['text'];
    }
    return $('<button type="button" '+options['class']+' '+options['style']+' data-multiply-delete="">'+inner_text+'</button>')
}

function create_multiply(options){
    var name = options["multiply-name"];
    options['add']['type'] = 'add_multiply';
    options['add']['multiply_to'] = name;
    var local_item = localStorage[page_name+'_'+name];
    if(local_item != null){
        local_item = JSON.parse(local_item);
        if(local_item['count'] != 0){
            if(options['add']['position'] == 'after' || options['add']['position'] == null){
                for(var i = 1;i<=local_item['count'];i++){
                    paste_element(local_item['template']);
                }
                paste_element(options['add']);
            }else{
                paste_element(options['add']);
                for(var i = 1;i<=local_item['count'];i++){
                    paste_element(local_item['template']);
                }
            }
        }
    }else{
        var to_storage = {};
        to_storage['template'] = options['template'];
        to_storage['add-position'] = options['add']['position'];
        to_storage['new-items-type'] = options['new-items-type'];
        to_storage['count'] = to_storage['num'] = 0;
        if(options['template']['visible'] != 'hidden'){
            if(options['add']['position'] == 'after' || options['add']['position'] == null){
                paste_element(options['template']);
                paste_element(options['add']);
            }else{
                paste_element(options['add']);
                paste_element(options['template']);
            }
            to_storage['count'] = to_storage['num'] = 1;
        }else{
            paste_element(options['add']);
        }
        localStorage[page_name+'_'+name] = JSON.stringify(to_storage);
    }
    return false;
}