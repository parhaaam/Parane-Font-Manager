var strings = pfm_strings;
jQuery(document).ready(function() {
  jQuery.ajax({
    //url: "https://api.myjson.com/bins/vthaa",
    url: ajaxurl,
    dataType: 'json',
    data: {
      action : 'FontManagerLoadFont'
    },
    success : function (result) {
      //console.log(result);
      if(result.length > 0){
        for (var font in result) {
          var normal=false,italic=false,oblique=false;

          var stertch = '',style = '';
          var styles = ['Italic','Normal','Oblique'];
          for (var index in styles) {
            if (result[font].style.includes(styles[index])) {
              style += '<option value="'+styles[index]+'" selected> ';
            }else {
              style += '<option value="'+styles[index]+' "> ';
            }
            style += styles[index]+'</option>';
          }
          var stretchs = ['Normal','Condensed','expanded'
                          ,'Semi-Condensed','Semi-expanded'
                          ,'Ultra-Condensed','Ultra-expanded'
                          ,'Extra-Condensed','Extra-expanded'
                          ];

          stertch = '';
          for (var index in stretchs) {
            stertch += '<option value="'+stretchs[index]+'"';
            if(result[font].stretch.includes(stretchs[index])){
              stertch += 'selected>';
            }else {
              stertch += '>';
            }
            stertch += stretchs[index]+ '</option>';
          }
          var weight = '';
          var weights = ['normal','bold','100','200','300','400','500','600','700','800','900'];
          for (var index in weights) {
            weight += '<option value="'+weights[index]+'"';
            if(result[font].weight.includes(weights[index])){
              weight +='selected>';
            }else {
              weight +='>'
            }
            weight += weights[index]+'</option>';
          }

          var elmnts = ['All','H1','H2','H3','H4','H5','H6',
                        'blockquote','Lists','HyperLinks','Paragraph'];
          var htmlElms = ['body','h1','h2','h3','h4','h5','h6','blockquote',
                          'li','a','p'];
          var elms = '';
          for (var elm in elmnts) {
            elms += '<option value="'+htmlElms[elm]+'"';
            if(result[font].elements && result[font].elements.includes(htmlElms[elm])){
              elms += 'selected>'+elmnts[elm]+'</option>';
            }else {
              elms += '>'+elmnts[elm]+'</option>';
            }

          }

          var FontItem = '<div class="card" font-number="'+font+'">'+
            '<div class="card-header">'+
              '<span class="remove" font-number="'+font+'" >&times;</span>'+
              '<a class="card-link" data-toggle="collapse" href="#collapse'+font+'" font-number="'+font+'">'+
                result[font].name+
              '</a>'+
            '</div>'+
            '<div id="collapse'+font+'" class="collapse" data-parent="#accordion">'+
              '<div class="card-body">'+
                '<div class="row">'+
                  '<div class="col-sm-6 col-md-6 col-lg-6 filds">'+
                    '<div class="form-group">'+
                      '<label for="fontName">'+strings.fontName+'</label>'+
                      '<input type="text" class="form-control" name="fontName" value="'+result[font].name+'" font-number="'+font+'">'+
                    '</div>'+
                    '<div class="files" font-number="'+font+'">'+
                      '<input type="hidden" name="inp'+font+'fileCount" value="0">'+
                    '</div>'+
                    '<a href="#" class="text-primary" name="addFile" font-number="'+font+'">'+strings.addFontFile+'</a>'+
                    '<div class="form-group">'+
                      '<label for="customElm">'+strings.customElementsLabel+'Custom Elements: </label>'+
                      '<textarea class="form-control" name="customElm" rows="8" cols="80">'+
                          result[font].custom+
                      '</textarea>'+
                      '<p class="moreInfo">'+
                        strings.customElmsHint+'<br>'+
                        'e.g: <kbd> #main </kbd> <br />'+
                          '<kbd>.wrapper</kbd><br />'+
                          '<kbd>body</kbd><br />'+
                      '</p>'+
                    '</div>'+
                  '</div>'+
                  '<div class="col-sm-6 col-md-6 col-lg-6 filds">'+
                    '<div class="form-group">'+
                      '<label for="style">'+strings.fontStyle+'Font Style: </label>'+
                      '<select class="form-control" name="style">'+
                        style+
                      '</select>'+
                    '</div>'+
                    '<div class="form-group">'+
                      '<label for="stretch">'+strings.fontStetch+'Font Stretch: </label>'+
                      '<select class="form-control" name="stretch">'+
                        stertch+
                      '</select>'+
                    '</div>'+
                    '<div class="form-group">'+
                      '<label for="weight">'+strings.fontWeight+'Font Weight: </label>'+
                      '<select class="form-control" name="weight">'+
                        weight+
                      '</select>'+
                    '</div>'+
                    '<div class="form-group">'+
                      '<label for="elements">'+strings.elements+'Elements:</label>'+
                      '<p>'+strings.elementsHint+'</p>'+
                      '<select multiple class="form-control" name="elements">'+
                        elms+
                      '</select>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>';

          jQuery('#accordion').append(FontItem);
          jQuery('input[name="fontCounter"]').val(font);
          for (var fontFiles in result[font].src) {
            var remove = '<span class="removeFile">&times;</span>';
            if(fontFiles == 0){
              remove = '';
            }
            var fontFileItem = '<div class="form-inline">'+
                               '<label for="fontSrc">'+strings.fontFileLabel+'</label>'+
                               '<input type="text" class="font-url" url-number="'+fontFiles+'"'+
                               ' value="'+result[font].src[fontFiles]+'">'+
                               '<button type="submit" class="btn btn-default btn-sm btn-url">'+strings.chooseFileBtn+'</button>'+
                               remove+
                               '</div>';
            jQuery('.files[font-number='+font+']').append(fontFileItem);
            jQuery('input[name="inp'+font+'fileCount"]').val(parseInt(jQuery('input[name="inp'+font+'fileCount"]').val())+1);
          }

        }

      }else {

          var currentFontNumb = 0;
          var FontItem = '<div class="card" font-number="'+currentFontNumb+'">'+
            '<div class="card-header">'+
              '<a class="card-link" data-toggle="collapse" href="#collapse'+currentFontNumb+'" font-number="'+currentFontNumb+'">'+
                'Font Name'+
              '</a>'+
            '</div>'+
            '<div id="collapse'+currentFontNumb+'" class="collapse" data-parent="#accordion">'+
              '<div class="card-body">'+
                '<div class="row">'+
                  '<div class="col-sm-6 col-md-6 col-lg-6 filds">'+
                    '<div class="form-group">'+
                      '<label for="fontName">'+strings.fontName+'Font Name:</label>'+
                      '<input type="text" class="form-control" name="fontName" value="" font-number="'+currentFontNumb+'">'+
                    '</div>'+
                    '<div class="files" font-number="'+currentFontNumb+'">'+
                      '<div class="form-inline">'+
                        '<label for="fontSrc">'+strings.fontFileLabel+'</label>'+
                        '<input type="text" class="font-url" name="inp0fontSrc" value="">'+
                        '<button type="submit" class="btn btn-default btn-sm btn-url">'+strings.chooseFileBtn+'</button>'+
                      '</div>'+
                      '<input type="hidden" name="inp'+currentFontNumb+'fileCount" value="0">'+
                    '</div>'+
                    '<a href="#" class="text-primary" name="addFile" font-number="'+currentFontNumb+'">'+strings.addFontFile+'</a>'+
                    '<div class="form-group">'+
                      '<label for="customElm">'+strings.customElementsLabel+'</label>'+
                      '<textarea class="form-control" name="customElm" rows="8" cols="80">'+
                      '</textarea>'+
                      '<p class="moreInfo">'+
                        +strings.customElmsHint+'<br>'+
                        'e.g: <kbd> #main </kbd> <br />'+
                          '<kbd>.wrapper</kbd><br />'+
                          '<kbd>body</kbd><br />'+
                      '</p>'+
                    '</div>'+
                  '</div>'+
                  '<div class="col-sm-6 col-md-6 col-lg-6 filds">'+
                    '<div class="form-group">'+
                      '<label for="style">'+strings.fontStyle+'</label>'+
                      '<select class="form-control" name="style">'+
                        '<option value="normal">Normal</option>'+
                        '<option value="italic">Italic</option>'+
                        '<option value="oblique">Oblique</option>'+
                      '</select>'+
                    '</div>'+
                    '<div class="form-group">'+
                      '<label for="stretch">'+strings.fontStetch+'</label>'+
                      '<select class="form-control" name="stretch">'+
                        '<option value="normal">Normal</option>'+
                        '<option value="condensed">Condensed</option>'+
                        '<option value="Ultra-condensed">Ultra-Condensed</option>'+
                        '<option value="Extra-condensed">Extra-Condensed</option>'+
                        '<option value="Semi-condensed">Semi-Condensed</option>'+
                        '<option value="expanded">expanded</option>'+
                        '<option value="Ultra-expanded">Ultra-expanded</option>'+
                        '<option value="Extra-expanded">Extra-expanded</option>'+
                        '<option value="Semi-expanded">Semi-expanded</option>'+
                      '</select>'+
                    '</div>'+
                    '<div class="form-group">'+
                      '<label for="weight">'+strings.fontWeight+'</label>'+
                      '<select class="form-control" name="weight">'+
                        '<option value="normal">Normal</option>'+
                        '<option value="bold">Bold</option>'+
                        '<option value="100">100</option>'+
                        '<option value="200">200</option>'+
                        '<option value="300">300</option>'+
                        '<option value="400">400</option>'+
                        '<option value="500">500</option>'+
                        '<option value="600">600</option>'+
                        '<option value="700">700</option>'+
                        '<option value="800">800</option>'+
                        '<option value="900">900</option>'+
                      '</select>'+
                    '</div>'+
                    '<div class="form-group">'+
                      '<label for="elements">'+strings.elements+'</label>'+
                      '<p>'+strings.elementsHint+'</p>'+
                      '<select multiple class="form-control" name="elements">'+
                        '<option value="All">All</option>'+
                        '<option value="H1">H1</option>'+
                        '<option value="H2">H2</option>'+
                        '<option value="H3">H3</option>'+
                        '<option value="H4">H4</option>'+
                        '<option value="H6">H6</option>'+
                        '<option value="H6">H6</option>'+
                        '<option value="blockquote">blockquote</option>'+
                        '<option value="p">Paragraph</option>'+
                        '<option value="li">Lists</option>'+
                        '<option value="a">HyperLinks</option>'+
                      '</select>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>';

          jQuery('#accordion').append(FontItem);
          jQuery('input[name="fontCounter"]').val(currentFontNumb)

      }

    },
    error : function (err) {
      jQuery('#alertBox').html('<div class="alert alert-danger">'+
                    '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
                    +strings.fontLoadingEror+
                    err.statusText+
                    '</div>');
                    console.log(err);

    },
    complete : function () {
      jQuery('#loading').css('display','none');
    }
  });


});



jQuery(document).on('click',"#addFont",function () {
  var currentFontNumb = parseInt(jQuery('input[name="fontCounter"]').val()) + 1;
  var FontItem = '<div class="card" font-number="'+currentFontNumb+'">'+
    '<div class="card-header">'+
      '<a class="card-link" data-toggle="collapse" href="#collapse'+currentFontNumb+'" font-number="'+currentFontNumb+'">'+
        strings.fontName+
      '</a>'+
    '</div>'+
    '<div id="collapse'+currentFontNumb+'" class="collapse" data-parent="#accordion">'+
      '<div class="card-body">'+
        '<div class="row">'+
          '<div class="col-sm-6 col-md-6 col-lg-6 filds">'+
            '<div class="form-group">'+
              '<label for="fontName">'+strings.fontName+'</label>'+
              '<input type="text" class="form-control" name="fontName" value="" font-number="'+currentFontNumb+'">'+
            '</div>'+
            '<div class="files" font-number="'+currentFontNumb+'">'+
              '<div class="form-inline">'+
                '<label for="fontSrc">'+strings.fontFileLabel+'</label>'+
                '<input type="text" class="font-url" name="inp0fontSrc" value="">'+
                '<button type="submit" class="btn btn-default  btn-sm btn-url">'+strings.chooseFileBtn+'</button>'+
              '</div>'+
              '<input type="hidden" name="inp'+currentFontNumb+'fileCount" value="0">'+
            '</div>'+
            '<a href="#" class="text-primary" name="addFile" font-number="'+currentFontNumb+'">'+strings.addFontFile+'</a>'+
            '<div class="form-group">'+
              '<label for="customElm">'+strings.customElementsLabel+'</label>'+
              '<textarea class="form-control" name="customElm" rows="8" cols="80">'+
              '</textarea>'+
              '<p class="moreInfo">'+
                strings.customElmsHint+'<br>'+
                'e.g: <kbd> #main </kbd> <br />'+
                  '<kbd>.wrapper</kbd><br />'+
                  '<kbd>body</kbd><br />'+
              '</p>'+
            '</div>'+
          '</div>'+
          '<div class="col-sm-6 col-md-6 col-lg-6 filds">'+
            '<div class="form-group">'+
              '<label for="style">'+strings.fontStyle+'</label>'+
              '<select class="form-control" name="style">'+
                '<option value="normal">Normal</option>'+
                '<option value="italic">Italic</option>'+
                '<option value="oblique">Oblique</option>'+
              '</select>'+
            '</div>'+
            '<div class="form-group">'+
              '<label for="stretch">'+strings.fontStetch+' </label>'+
              '<select class="form-control" name="stretch">'+
                '<option value="normal">Normal</option>'+
                '<option value="condensed">Condensed</option>'+
                '<option value="Ultra-condensed">Ultra-Condensed</option>'+
                '<option value="Extra-condensed">Extra-Condensed</option>'+
                '<option value="Semi-condensed">Semi-Condensed</option>'+
                '<option value="expanded">expanded</option>'+
                '<option value="Ultra-expanded">Ultra-expanded</option>'+
                '<option value="Extra-expanded">Extra-expanded</option>'+
                '<option value="Semi-expanded">Semi-expanded</option>'+
              '</select>'+
            '</div>'+
            '<div class="form-group">'+
              '<label for="weight">'+strings.fontWeight+'</label>'+
              '<select class="form-control" name="weight">'+
                '<option value="normal">Normal</option>'+
                '<option value="bold">Bold</option>'+
                '<option value="100">100</option>'+
                '<option value="200">200</option>'+
                '<option value="300">300</option>'+
                '<option value="400">400</option>'+
                '<option value="500">500</option>'+
                '<option value="600">600</option>'+
                '<option value="700">700</option>'+
                '<option value="800">800</option>'+
                '<option value="900">900</option>'+
              '</select>'+
            '</div>'+
            '<div class="form-group">'+
              '<label for="elements">'+strings.elements+'</label>'+
              '<p>'+strings.elementsHint+'</p>'+
              '<select multiple class="form-control" name="elements">'+
                '<option value="All">All</option>'+
                '<option value="H1">H1</option>'+
                '<option value="H2">H2</option>'+
                '<option value="H3">H3</option>'+
                '<option value="H4">H4</option>'+
                '<option value="H6">H6</option>'+
                '<option value="H6">H6</option>'+
                '<option value="blockquote">blockquote</option>'+
                '<option value="p">Paragraph</option>'+
                '<option value="li">Lists</option>'+
                '<option value="a">HyperLinks</option>'+
              '</select>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>';

  jQuery('#accordion').append(FontItem);
  jQuery('input[name="fontCounter"]').val(currentFontNumb);
})


jQuery(document).on('keyup','input[name="fontName"]',function(){
  var fontNumber = jQuery(this).attr('font-number');
  if(jQuery(this).val().length > 0){
    jQuery('.card-header a[font-number="'+fontNumber+'"]').html(jQuery(this).val());
  }
  else {
    jQuery('.card-header a[font-number="'+fontNumber+'"]').html(strings.fontName);
  }
});
jQuery(document).on('click','.removeFile',function () {
  jQuery(this).parent()[0].remove();
});
jQuery(document).on('click','.remove',function () {
  var fontNumb = jQuery(this).attr('font-number');
  var fontsCount = jQuery('input[name="fontCounter"]').val();
  jQuery('.card[font-number="'+fontNumb+'"]').remove();
  jQuery('input[name="fontCounter"]').val(fontsCount-1);

});
jQuery(document).on('click','.btn-url',function (e) {
  e.preventDefault();
  var textInput = jQuery('input',jQuery(this).parent()[0]);
  if(textInput.hasClass('input-error')){
    textInput.removeClass('input-error');
  }
  // Create a new media frame
  frame = wp.media({
    title: strings.mediaTitle,
    button: {
      text: strings.mediaBtn
    },
    multiple: false  // Set to true to allow multiple files to be selected
  });
  frame.open()
  frame.on( 'select', function() {

      // Get media attachment details from the frame state
      var attachment = frame.state().get('selection').first().toJSON();
      textInput.val(attachment.url);
    });


});
jQuery(document).on("click",'a[name="addFile"]',function(e) {
  e.preventDefault();
  var fontNumber = jQuery(this).attr('font-number');
  var fontCounter = parseInt(jQuery('input[name="inp'+fontNumber+'fileCount"]').val())+1;
  var fontFileItem = '<div class="form-inline">'+
                     '<label for="fontSrc">'+strings.fontFileLabel+'</label>'+
                     '<input type="text" class="font-url" name="inp'+fontCounter+'fontSrc"'+
                     ' value="">'+
                     '<button type="submit" class="btn btn-default btn-sm btn-url">'+strings.chooseFileBtn+'</button>'+
                     '<span class="removeFile">&times;</span>'+
                     '</div>';
  jQuery('.files[font-number='+fontNumber+']').append(fontFileItem);
  jQuery('input[name="inp'+fontNumber+'fileCount"]').val(parseInt(jQuery('input[name="inp'+fontNumber+'fileCount"]').val())+1);
});


jQuery(document).on("click",'#save',function() {
  var fontsCounter = jQuery('.card');
  var fonts = [];
  fontsCounter.each(function(i,item){
    var fontNumber = jQuery(this).attr('font-number');
    var src = [];
    jQuery('input.font-url',this).each(function (j,fontFile) {
      if(jQuery(this).val().length == 0){
        jQuery(this).addClass('input-error');
        jQuery('#alertBox').html('<div class="alert alert-danger">'+
                      '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
                      strings.emptyFileInputErorr+
                      '</div>');
        throw new Error();
      }
      src[j] = jQuery(this).val()
    });
    //console.log(src);
    var elms = [];
    jQuery('.card[font-number="'+fontNumber+'"] select[name="elements"]').find(":selected").each(function(index) {
      switch (jQuery(this).text()) {
        case 'H1':
          elms[index] = 'h1'
          break;
        case 'H2':
          elms[index] = 'h2'
          break;
        case 'H3':
          elms[index] = 'h3'
          break;
        case 'H4':
          elms[index] = 'h4'
          break;
        case 'H5':
          elms[index] = 'h5'
          break;
        case 'H6':
          elms[index] = 'h6'
          break;
        case 'blockquote':
          elms[index] = 'blockquote'
          break;
        case 'Lists':
          elms[index] = 'li'
          break;
        case 'HyperLinks':
          elms[index] = 'a'
          break;
        case 'Paragraph':
          elms[index] = 'p'
          break;
        case 'All':
          elms[index] = 'body'
          break;
        default:

      }
        //elms[index] = jQuery(this).text();
    })
    fonts[i] = {
      name: jQuery('.card[font-number="'+fontNumber+'"] input[name="fontName"]').val() ? jQuery('.card[font-number="'+fontNumber+'"] input[name="fontName"]').val() : "fontname"+fontNumber,
      style: jQuery('.card[font-number="'+fontNumber+'"] select[name="style"]').find(":selected").text(),
      stretch: jQuery('.card[font-number="'+fontNumber+'"] select[name="stretch"]').find(":selected").text(),
      weight: jQuery('.card[font-number="'+fontNumber+'"] select[name="weight"]').find(":selected").text(),
      elements : elms,
      custom: (jQuery('.card[font-number="'+fontNumber+'"] textarea[name="customElm"]').val().length > 0 ) ? jQuery('.card[font-number="'+fontNumber+'"] textarea[name="customElm"]').val().split('\n') : "",
      src : src
    };
  });
  //console.log(fonts);
  jQuery('#save').prop('disabled',true);
  jQuery('#save').html('Saving');

  jQuery.ajax({
        url: ajaxurl,
        dataType: 'json',
        data : {
                  action : 'FontManagerSaveFont',
                  fonts : fonts,
                  nnce : strings.nounce
        },
        type : 'post',
        success: function(result){
            jQuery('#save').html('Changes Saved');
            jQuery('#alertBox').html('<div class="alert alert-success">'+
                          '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
                          strings.fontSavedSuccess+
                          '</div>');
            console.log(result);

        },
        error: function (err) {
          jQuery('#alertBox').html('<div class="alert alert-danger">'+
                        '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
                        strings.fontSavingErorr+
                        err.statusText+
                        '</div>');
                        console.log(err);
        },
        complete: function() {
          jQuery('#save').html('Save Changes');
          jQuery('#save').prop('disabled',false);

        }
    })
});
