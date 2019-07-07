<?php
/**
 * @package Parane Font Manager
 * @version 1.6
 * Plugin Name: Parane Font Manager
 * Description: Parane Font Manager allows you to use any fonts you want in wordpress
 * Author: Parham Parnian
 * Version: 1.0
 * Author URI:
 * Text Domain: pfm_fontManager
 * Domain Path: /languages/
*/
include_once __DIR__."/includes/AdminPage.php";
class PFM_FontManager {
  private $adminPage;




  function __construct()
  {

    $this->adminPage = new PFM_AdminPage();
    add_action("admin_enqueue_scripts",array($this,"FontManagerAdminStyle"));
    add_action("admin_menu",array($this,"FontManagerMenu"));
    add_action("plugins_loaded",array($this, 'FontManagerLocal' ));
    add_action('wp_ajax_FontManagerSaveFont', array($this,"FontManagerSaveFont"));
    add_action('wp_ajax_FontManagerLoadFont', array($this,"FontManagerLoadFont"));
    if(!is_admin()){
      //wp_enqueue_style("pfm_fontManagerStyelSheet", plugin_dir_url(__FILE__)."assets/css/FontManager.css");
      add_action( 'wp_enqueue_scripts',array($this ,'LoadCssInHead'));

    }else{
      add_filter('upload_mimes', array($this,'AddCustomUploadMimes'));
    }
  }

  function FontManagerAdminStyle()
  {
    wp_enqueue_media();
    wp_enqueue_style("pfm_bootstrap",plugin_dir_url(__FILE__)."assets/css/bootstrap.css");
    wp_enqueue_style("pfm_fontManagerAdminStyle",plugin_dir_url(__FILE__)."assets/css/admin.css");
    wp_enqueue_script('pfm_bootstrapJs',plugin_dir_url(__FILE__)."assets/js/bootstrap.min.js", array('jquery'));
    wp_enqueue_script('pfm_uiJs',plugin_dir_url(__FILE__)."assets/js/ui.js");
    $strings = array(
                  'fontName'  => __('Font Name: ','pfm_fontManager'),
                  'addFontFile' => __('+ Add another font','pfm_fontManager'),
                  'customElementsLabel' => __('Custom Elements: ','pfm_fontManager'),
                  'customElmsHint'  => __('Seprate Elements with line breaks, ','pfm_fontManager'),
                  'fontStyle' => __('Font Style: ','pfm_fontManager'),
                  'fontStetch'  => __('Font Stretch: ','pfm_fontManager'),
                  'fontWeight'  => __('Font Weight: ','pfm_fontManager'),
                  'elements'  => __('Elements: ','pfm_fontManager'),
                  'elementsHint'  => __('hold ctrl or shift (or drag with the mouse) to select more than one ','pfm_fontManager'),
                  'fontLoadingEror' => __('We got a problem while loading Fonts because: ','pfm_fontManager'),
                  'fontFile'  => __('fontFile','pfm_fontManager'),
                  'mediaTitle'  => __('Choose/Upload your font file','pfm_fontManager'),
                  'mediaBtn'  => __('Choose Font','pfm_fontManager'),
                  'fontFileLabel' => __('Font Url: ','pfm_fontManager'),
                  'chooseFileBtn' => __('Choose Font','pfm_fontManager'),
                  'emptyFileInputErorr' => __('We cannot save your fonts because some of font urls was empty!','pfm_fontManager'),
                  'fontSavedSuccess'  => __('Your Fonts Setting Saved Successfully!','pfm_fontManager'),
                  'fontSavingErorr' => __('We got a problem while Saving Fonts because: ','pfm_fontManager'),
                  'nounce' => wp_create_nonce('pfm-fontManager'),
                );
    $string = wp_localize_script('pfm_uiJs','pfm_strings',$strings);
    wp_localize_script( 'pfm_ajaxScript', 'ajax_object', array( 'ajax_url' => admin_url( 'admin-ajax.php' ), 'we_value' => 1234 ) );

  }
  function FontManagerLocal()
  {
    load_plugin_textdomain( 'pfm_fontManager', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
  }
  function FontManagerMenu()
  {
    add_theme_page(
                    __('Font Manager','pfm_fontManager')
                    ,__('Font Manager','pfm_fontManager')
                    ,'manage_options'
                    ,'pfm_fontManager-admin'
                    ,array($this->adminPage,'AdminView')
                  );
    /*add_theme_page(
                    'debug'
                    ,'debug'
                    ,'manage_options'
                    ,'debug'
                    ,array($this,'debug')
                  );*/
  }
  function FontManagerSaveFont()
  {
    check_ajax_referer( 'pfm-fontManager', 'nnce' );
    $fonts = $_POST['fonts'];
    $sanitFonts = [];
    foreach ($fonts as $font) {
      $urls = $customs = $elements = [];
      foreach ($font['src'] as $url) {
        $urls[] = esc_url_raw($url);
      }
      foreach ($font['custom'] as $custom) {
        $customs[] = sanitize_text_field($custom);
      }
      foreach ($font['elements'] as $element) {
        $elements = sanitize_text_field($element);
      }
      $sanitFonts[] = [
                        'name' => sanitize_text_field($font['name']),
                        'style' => sanitize_text_field($font['style']),
                        'stretch' => sanitize_text_field($font['stretch']),
                        'weight' => sanitize_text_field($font['weight']),
                        'elements'  => $elements,
                        'src' => $urls,
                        'custom'  => $customs
                        ];
    }
    $result = update_option("pfm_fonts",$sanitFonts,null);


  }
  function FontManagerLoadFont()
  {
      $fontsFromDb = get_option('pfm_fonts',array());
      wp_send_json($fontsFromDb);
  }
  function AddCustomUploadMimes($existing_mimes) {
      $existing_mimes['otf'] = 'application/x-font-otf';
      $existing_mimes['woff'] = 'application/x-font-woff';
      $existing_mimes['ttf'] = 'application/x-font-ttf';
      $existing_mimes['svg'] = 'image/svg+xml';
      $existing_mimes['eot'] = 'application/vnd.ms-fontobject';
      return $existing_mimes;
  }
  function LoadCssInHead()
  {
    $css = $this->CreateCss();
    wp_enqueue_style('pfm_FontsCSS',get_stylesheet_directory_uri() );
    wp_add_inline_style('pfm_FontsCSS',$css);
  }
  function CreateCss()
  {
    $json = get_option('pfm_fonts',array());
    $css = "";
    foreach ($json as $font) {

      $css .= "@font-face{";
      $css .= "font-family:".$font['name'].";";
      $css .= "font-stretch:".$font['stretch'].";";
      $css .= "font-style:".$font['style'].";";
      $css .="font-weight:".$font['weight'].";";
      $css .="src:";
      //$urlsCount = count($font['src']);
      //$counter = 0;
      foreach ($font['src'] as $url) {
        $type = explode('.',$url)[1];
        switch ($type) {
          case 'eot':
            $css .= "url('".$url."'),";
            $css .= "url('".$url."?#iefix') format('embedded-opentype'),";
            break;
          case 'woff':
            $css .= "url('".$url."') format('woff'),";
            break;
          case 'woff2':
            $css .= "url('".$url."') format('woff2'),";
            break;
          case 'ttf':
            $css .= "url('".$url."') format('truetype'),";
            break;
          case 'svg':
            $css .= "url('".$url."#svgFontName') format('svg'),";
            break;
          default:
            // code...
            break;
          }
      }
      $css = preg_replace("/\,$/","",$css).";";
      $css .="}";
      if($font['elements'] != ''){
        if(is_array($font['elements'])){
          $css .= implode(',',$font['elements'])."{";
        }else {
          $css .= $font['elements']."{";
        }
        $css .= "font-family:".$font['name']." !important;}";
      }
      if($font['custom'] != ''){
        if(is_array($font['custom'])){
          $css .= implode(',',$font['custom'])."{";
        }else {
          $css .= $font['custom']."{";
        }
        $css .= "font-family:".$font['name']." !important;}";
      }
    }

    return $css;
  }
  function debug()
  {

  }
}


add_action("plugins_loaded","FontManagerInit");
function FontManagerInit()
{
  $fontManager = new PFM_FontManager();
}


?>
