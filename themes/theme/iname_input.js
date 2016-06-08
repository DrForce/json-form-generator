function create_image_input(options){
    var item_class = '';
    if(options['class'] != null && options['class'] != ''){
        item_class = options['class'];
    }else{
        item_class = styles.image_input;
    }
    var item_style = '';
    if(options['style'] != null && options['style'] != ''){
        item_style = 'style= "'+options['style']+'"';
    }
    return $('<div class="drop_file" '+item_style+'>' +
        'Перетащите файлы сюда или' +
        '<div class="body_file_btn">' +
        '<input type="file">' +
        '<div class="add_file">Выберите на компьютере</div>' +
        '</div>' +
        '</div>')
}

function drag_drop_files(){
    var dropZone = $('.drop_file');

    dropZone[0].ondragover = function() {
        dropZone.addClass('hover');
        return false;
    };

    dropZone[0].ondragleave = function() {
        dropZone.removeClass('hover');
        return false;
    };

    dropZone[0].ondrop = function (e) {
        dropZone.removeClass('hover');
        e.preventDefault();
        var file = event.dataTransfer.files[0];
        /*var xhr = new XMLHttpRequest();
         xhr.upload.addEventListener('progress', uploadProgress, false);
         xhr.open('POST', '/upload.php');
         xhr.setRequestHeader('X-FILE-NAME', file.name);
         xhr.send(file);
         <?php

         $uploaddir = getcwd().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR;
         $uploadfile = $uploaddir.basename($_FILES['file']['name']);

         move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile);

         ?>
         */
        dropZone.find('.add_file').html(file.name);
    };

    $('.drop_file input').change(function(){
        $(this).siblings('.add_file').html($(this).val());
    })
}