//
// NOTE: ANY CHANGES TO THIS FILE MUST BE DONE IN STORES AND MERCHANT PROJECTS
// DESIGN CENTER IS DEPENDENT ON THIS STORES RELATED FILE IN MERCHANT.
// JScript File

    // function to display initial values on the item detail page
    function init_display(itemid) {

        load_product_info();          
  
        var oForm = document.forms[0];
                            
        for (var i = 0 ; i < var_counts.length; i++) {               
           var next_var = SearchControlTree(oForm, var_names_values[i]);          
           next_var.options.length = 0;                      
           add_option(next_var, "NoSelection", var_names_display[i]);
        }
                  
        var first_var_count = var_counts[0];
        if (first_var_count == 1) {
           var curr_var = SearchControlTree(oForm, var_names_values[0]);
           var var_value = var_choices_values_2[0];
           var var_display = var_choices_display_2[0];
           add_option(curr_var, var_value, var_display);
           curr_var.options[1].selected = true;
           display_next_select(0);
        } 
        else {
            if (first_var_count > 1) {
                reset_first() ;
            }              
        }
        
        //first check to see if we have an item selected
        //.. could be because there's just one child
        var idx = get_itemid_selected();
        if (idx > -1)
            select_current_product(idx);
        else
            //select the given item id if possible
            set_current_product_from_itemid(itemid);
    
    }  // function init_display
            


    // function to load the item details into the data structures        
    function load_product_info()
    {             
        if ( typeof( store_item != 'undefined'))
        {
          // load the new object's old global data
          start_idx      = store_item['start_idx'];
          end_idx        = store_item['end_idx'];
          attr_increment = store_item['attr_increment'];
          
          item_ids                   = store_item['item_ids'];
          item_count                 = store_item['item_count'];
          item_skus                  = store_item['item_skus'];
          item_qtys                  = store_item['item_qtys'];
          item_prices                = store_item['item_prices'];
          item_prices_display        = store_item['item_prices_display'];
          item_retail_prices         = store_item['item_retail_prices'];
          item_retail_prices_display = store_item['item_retail_prices_display'];
          
          item_thumbs = store_item['item_thumbs'];
          item_images = store_item['item_images'];
          
          def_price  = store_item['def_price'];
          def_images = store_item['def_images'];
          def_thumbs = store_item['def_thumbs'];
          def_desc   = store_item['def_desc'];
          
          var_counts         = store_item['var_counts'];
          var_names_display  = store_item['var_names_display'];
          var_names_values   = store_item['var_names_values'];
          
          var_choices_display_2 = store_item['var_choices_display_0'];
          var_choices_values_2  = store_item['var_choices_values_0'];
          var_choices_display_3 = store_item['var_choices_display_1'];
          var_choices_values_3  = store_item['var_choices_values_1'];
          var_choices_display_4 = store_item['var_choices_display_2'];
          var_choices_values_4  = store_item['var_choices_values_2'];
          var_choices_display_5 = store_item['var_choices_display_3'];
          var_choices_values_5  = store_item['var_choices_values_3'];
          var_choices_display_6 = store_item['var_choices_display_4'];
          var_choices_values_6  = store_item['var_choices_values_4'];
          var_choices_display_7 = store_item['var_choices_display_5'];
          var_choices_values_7  = store_item['var_choices_values_5'];
          var_choices_display_8 = store_item['var_choices_display_6'];
          var_choices_values_8  = store_item['var_choices_values_6'];
          var_choices_display_9 = store_item['var_choices_display_7'];
          var_choices_values_9  = store_item['var_choices_values_7'];          
        }
    }  // function load_product_info



    //function to add an option to a dropdown
    function add_option(select, value, text)
    {
      var index = select.options.length ;
      select.options.length       = index + 1;
      select.options[index].text  = text + "     ";
      select.options[index].value = value ;
    } // function add_option
    
    
    
    //function to set the first dropdown
    function reset_first()
    {       
        var start_idx = 0 ;
        var end_idx   = 0 ;
        var attr_incr = 0 ;
        var next_idx  = 0 ;
              
        //start_idx       = get_start_index(-1);
        //end_idx         = get_end_index() ;
        //attr_incr       = get_attr_increment() ;
        //alert("start "+start_idx + " ? " + get_start_index2(-1));
        //alert("end "+end_idx + " ? " + get_end_index2(-1));
        //alert("incr "+attr_incr + " ? " + get_attr_increment2(-1));       
        start_idx = get_start_index2(-1);
        end_idx = get_end_index2(-1);
        attr_incr = get_attr_increment2(-1);
        
        var display_cnt = 0 ;
        var oForm = document.forms[0];
        var curr_sel = SearchControlTree(oForm, var_names_values[0]);
        curr_sel.options.length = 0 ;
        var seg_idx  = 2 ;

        var_choices_length  = eval("var_choices_display_" + seg_idx + ".length") ;

        for (var i = 0 ; i < var_choices_length; i++) {
            
            var seg_list = eval("var_choices_display_" + seg_idx + "[" + i + "]") ;  
            var seg_value = eval("var_choices_values_" + seg_idx + "[" + i + "]") ;         
            
            var attr_value_valid = 0 ;
            attr_value_valid = validate_attr_value(start_idx, attr_incr) ;
            start_idx += attr_incr ;
            
            if (attr_value_valid == 1) {
                if (display_cnt == 0) {
                    add_option(curr_sel, "NoSelection", var_names_display[seg_idx - 2]);
                }
                add_option(curr_sel, seg_value, seg_list);
                display_cnt++;
            }
            
        } // for loop
        
        if (display_cnt == 1) {
            // select the only option displayed and go to the next dropdown
            curr_sel.options[1].selected = true ;
            display_next_select(next_idx) ;
        } // only one option in the drop down
        
    } // reset_first
    
    
    //function to determine if attr value is valid to include in dropdown
    function validate_attr_value(start_idx, attr_incr)
    {       
        var record_found = 0;
        for (var i = start_idx; i < start_idx + attr_incr; i++) {
            if (item_ids[i] > 0) {
                record_found = 1;
                break ;
            }
        } // for loop 
        return(record_found) ;
    }
    
    
    //function to determine if attr value is valid to include in dropdown
    function display_next_select(curr_idx)
    {       
        var oForm = document.forms[0];                           
        var curr_sel = SearchControlTree(oForm, var_names_values[curr_idx]);
        var selected_idx = curr_sel.selectedIndex;
        var selected_val = curr_sel.options[selected_idx].value ;
        
        //set_hidden("seg"+(curr_idx+2)+sno, selected_val);
        //set_hidden("seg"+(curr_idx+2), selected_val);
            
        var start_idx = 0 ;
        var end_idx   = 0 ;
        var attr_incr = 0 ;
        var next_idx = curr_idx + 1 ;
        var segments_cnt = var_counts.length;

        start_idx = get_start_index2(curr_idx);
        end_idx = get_end_index2(curr_idx);
        attr_incr = get_attr_increment2(curr_idx);
        var display_cnt = 0 ;  
                              
        if (next_idx < segments_cnt) {
            //set_hidden("iid", "");
            //set_hidden("sku", "");

            // reset all dropdowns after this
            for (var i = curr_idx+1 ; i < segments_cnt; i++) {
                //set_hidden("seg"+(i+2), "");
                var sel_name = SearchControlTree(oForm, var_names_values[i]) ;
                sel_name.options.length = 0 ;
                add_option(sel_name, "NoSelection", var_names_display[i]);
            }

            if (selected_idx == 0) {
                return ;
            }
      
            var seg_idx  = curr_idx + 3 ;
            var next_sel = SearchControlTree(oForm, var_names_values[next_idx]) ;
            next_sel.options.length = 0 ;

            arr_length  = eval("var_choices_display_" + seg_idx + ".length") ;

            for (var i = 0 ; i < arr_length; i++) {
                var seg_value = eval("var_choices_values_" + seg_idx + "[" + i + "]") ;
                var seg_list = eval("var_choices_display_" + seg_idx + "[" + i + "]") ;
                var valid_attr_value = 0 ;
        
                valid_attr_value = validate_attr_value(start_idx, attr_incr) ;
                start_idx += attr_incr ;

                if (valid_attr_value == 1) {
                    if (display_cnt == 0) {
                        add_option(next_sel, "NoSelection", var_names_display[curr_idx + 1]);
                    }
                    add_option(next_sel, seg_value, seg_list);
                    display_cnt++;
                }
            } // for loop
            if (display_cnt == 1) {
                // select the only option displayed and go to the next dropdown
                next_sel.options[1].selected = true ;
                display_next_select(next_idx) ;
            }
        } 
        else {
            if (selected_idx == 0) {
	            //set_hidden("seg"+(next_idx+1), "");
	            //set_hidden("iid", "");
                //set_hidden("sku", "");
            } 
        }        
    }
    
    
    
    function choose_product(select_number)
    {
        //load_product_info();
        display_next_select(select_number);
        
        //check to see if we have an item selected
        var idx = get_itemid_selected();
        select_current_product(idx);
    }
    
    
    function set_current_product_from_itemid(itemid)
    {   
        if (itemid > 0) {        
            var found = -1;
            for (var i = 0 ; i < item_ids.length; i++) {
                if (item_ids[i] == itemid) {
                    found = i;
                    break;
                }
            }
            
            //get itemd idx
            if (found > -1) {
                var attr_values_selectedIndex = get_selected_idx(found);       
            
                var oForm = document.forms[0];              
                //selects the dropdown based on the idx of the item_ids array
                for (var i = 0; i < var_counts.length; i++) {
                    var curr_sel = SearchControlTree(oForm, var_names_values[i]);           
                    var selected_val = eval("var_choices_values_" + (i+2) + "[" + attr_values_selectedIndex[i]+"]");         
                    set_selected_value(i, selected_val);
                    display_next_select(i);
                }
                
            }
            
            //updates all images on the idx of the images array
            select_current_product(found);
        }
    }
    
    function select_current_product(idx)
    {   
        //updates the price on the idx of the price array
        display_price(idx, StoreCulture);        
        update_images(idx);
        
        var addtocart = document.getElementById("addtocartcontrols");
        var customhtml = document.getElementById("customhtml");
        
        if (item_count == 0 || item_qtys[idx] < 1) {
            addtocart.style.visibility = "hidden";
            customhtml.innerHTML = OutOfStockText;
        }
        else {
            addtocart.style.visibility = "visible";
            customhtml.innerHTML = def_desc;
        }
        iSelectedItemIndex = idx;
    }
       
       
    function get_start_index2(curr_idx) {      
        var return_val = 0;
        if (curr_idx > -1) {
            var choices_remaining = 1;
            for (var i = (curr_idx + 1); i < var_counts.length; i++)
            {
                choices_remaining = choices_remaining * var_counts[i];
            }
            
            var curr_sel = abs_sel_index(curr_idx);
            return_val = (( (curr_sel-1) * choices_remaining) + get_start_index2(curr_idx - 1));
        }
        else
        {
            return_val = 0;
        }
        return (return_val);
    }

    
    function get_end_index2(curr_idx) {
        var return_val;
        var choices_remaining = 1;

        for (var i = (curr_idx + 1); i < var_counts.length; i++)
        {
            choices_remaining = choices_remaining * var_counts[i];
        }
        
        if (curr_idx > -1) {
            var curr_sel = abs_sel_index(curr_idx);
            if (curr_idx > 0)
                return_val = ( get_end_index2(curr_idx-1) - ((var_counts[curr_idx] - curr_sel) * choices_remaining) );
            else if (curr_idx == 0)
                return_val = curr_sel * choices_remaining - 1;
        }
        else
            return_val = choices_remaining - 1;            
        
        return (return_val);
    }
    
    
    function get_attr_increment2(curr_idx) {
        var return_val = 1;
        var choices_remaining = 1;
        
        for (var i = (curr_idx + 2); i < var_counts.length; i++)
        {
            choices_remaining = choices_remaining * var_counts[i];
        }   
        return_val = choices_remaining;
        return (return_val);
    }
  
  
  
  function abs_sel_index (idx) {
    
    var oForm = document.forms[0];
    var curr_sel = SearchControlTree(oForm,var_names_values[idx]);
    var selected_idx = curr_sel.selectedIndex;
    var selected_val = curr_sel.options[selected_idx].value ;
    var return_val = 0;

    seg_idx = idx + 2 ;
    arr_length  = eval("var_choices_display_" + seg_idx + ".length") ;
    
    for (var i = 0 ; i < arr_length; i++) {
      var seg_value = eval("var_choices_values_" + seg_idx + "[" + i + "]") ;
      if (seg_value == selected_val) {
        return_val = i + 1;
        break;
      }
    }   
    return(return_val);
  }
  
  
  function get_list_sel_index (idx) {
    
    var oForm = document.forms[0];
    var curr_sel = SearchControlTree(oForm,var_names_values[idx]);
    var selected_idx = curr_sel.selectedIndex;
    var selected_val = curr_sel.options[selected_idx].value ;
    var return_val = 0;

    seg_idx = idx + 2 ;
    arr_length  = eval("var_choices_display_" + seg_idx + ".length") ;
    
    for (var i = 0 ; i < arr_length; i++) {
      var seg_value = eval("var_choices_values_" + seg_idx + "[" + i + "]") ;
      if (seg_value == selected_val) {
        return_val = i;
        break;
      }
    }   
    return(return_val);
  }
  
  
  function set_selected_value(idx, selected_val)
  {
    var oForm = document.forms[0];
    var curr_sel = SearchControlTree(oForm, var_names_values[idx]);
    seg_idx = idx + 2;
    arr_length  = curr_sel.options.length;
    for (var i = 0 ; i < arr_length; i++) { 
        seg_val = curr_sel.options[i].value;
        if (seg_val == selected_val) {
            curr_sel.options[i].selected = true;
            break;
        }
    }
  }
  

  function get_end_index() {
    var end_idx = end_pos ;
    return(end_idx) ;
  }



  function get_attr_increment() {
    var tmp_attr_inc = attr_increment ;
    return(tmp_attr_inc) ;
  }
  
  
  //this returns an array of selectedIndex for selectboxes based on idx from main product array
  function get_selected_idx(idx)
  {
    var attr_values_count_length = var_counts.length;
        
    var total_select_combinations = new Array(attr_values_count_length);
    var attr_values_selectedIndex = new Array(attr_values_count_length);
    var compute_remainder = new Array(attr_values_count_length);

    //for each select get the total choices in subsequent selects
    for (var i = 0 ; i < attr_values_count_length; i++) {
        total_select_combinations[i] = get_total_select_combinations(i);
    }
  
    for (var x = 0; x < attr_values_count_length; x++) {
        if (x > 0) {
            if ( (x < (attr_values_count_length - 1)) && (total_select_combinations[x] > 0) ) {  
                attr_values_selectedIndex[x] = Math.floor(compute_remainder[x-1] / total_select_combinations[x]);
                compute_remainder[x] = compute_remainder[x-1] % total_select_combinations[x];    
            }
            else {
                attr_values_selectedIndex[x] = compute_remainder[x-1];
                return (attr_values_selectedIndex);
            }
        }
        else {
            if (total_select_combinations[0] > 0) {    
                attr_values_selectedIndex[0] = Math.floor(idx / total_select_combinations[0]);
                compute_remainder[0] = idx % total_select_combinations[0];
            }
            else {
                attr_values_selectedIndex[0] = idx;
                return (attr_values_selectedIndex);
            }
        }
        
    }
    return (attr_values_selectedIndex);
  }
    
  
    function get_total_select_combinations(idx)
    {
        var total_select_combinations = 0;
        //mult the remaining counts in the lists
        for (var i = (idx+1) ; i < var_counts.length; i++) {
            if (total_select_combinations == 0) {
                total_select_combinations = var_counts[i];
            }
            else {
                total_select_combinations = (total_select_combinations * var_counts[i]);
            }
        }  
        return (total_select_combinations);    
    }
  
  
  
    function get_itemid_selected()
    {
        var selected_attr_values = new Array(var_counts.length);
        var oForm = document.forms[0];
        
        //cycle through the selectboxes
        for (var i = 0 ; i < var_counts.length; i++) {        
            
            var curr_sel = SearchControlTree(oForm, var_names_values[i]);            
            //if set to "NoSelection" then we return -1 index value
            if (curr_sel.options[curr_sel.options.selectedIndex].value == "NoSelection") {
                return -1;
            }
            else {
                selected_attr_values[i] = get_list_sel_index(i);
            }
        }
        
        var idx = 0;
        for (var x = 0 ; x < selected_attr_values.length; x++) {
            if (x < selected_attr_values.length - 1) {
                idx = idx + (selected_attr_values[x] * get_total_select_combinations(x));
            }
            else {
                idx = idx + (selected_attr_values[x]);
            }
        }
        return (idx);     
    }
    
    
    function display_price(idx, sCulture)
    {
        var oForm = document.forms[0];
        var price_style = SearchControlTree(oForm,"PriceStyle").value;
        var retail_price = item_retail_prices[idx];
        var store_price = item_prices[idx];
        var curr_price = document.getElementById("price");
        
        if (idx > -1) {
            //strikethrough price with now
            if (price_style == 0) {
                if ((parseFloat(retail_price) > 0) && (parseFloat(retail_price) > parseFloat(store_price))) {
                    curr_price.innerHTML = "<font style=\"text-decoration:line-through\">" + FormatCurrency(retail_price,sCulture) + "</font>";
                    var now_value = document.getElementById("now_value");
                    var line_now = document.getElementById("line_now");
                    if (now_value != null) now_value.innerHTML = FormatCurrency(store_price,sCulture);
                    if (line_now != null) line_now.style.visibility = "visible";
                }
                else {
                    var line_now = document.getElementById("line_now");
                    if (line_now != null) line_now.style.visibility = "hidden";
                    curr_price.innerHTML = FormatCurrency(store_price,sCulture);
                }
            }
            //was - save - whilequantitieslast
            else if (price_style == 2) {
                curr_price.innerHTML = "<font style=\"font-size:larger\"><b>" + FormatCurrency(store_price,sCulture) + "</b></font>";
                if ((parseFloat(retail_price) > 0) && (parseFloat(retail_price) > parseFloat(store_price))) {
                    var line_was = document.getElementById("line_was");
                    var save_value = document.getElementById("save_value");
                    var was_value = document.getElementById("was_value");
                    if (line_was != null) line_was.style.visibility = "visible";
                    if (save_value != null) save_value.innerHTML = Math.floor(((parseFloat(retail_price) - parseFloat(store_price))/parseFloat(retail_price) * 100)) + "%";
                    if (was_value != null) was_value.innerHTML = FormatCurrency(retail_price,sCulture);
                }
                else {
                    var line_was = document.getElementById("line_was");
                    if (line_was != null) line_was.style.visibility = "hidden";
                }
            }
            //default
            else {
                curr_price.innerHTML = FormatCurrency(store_price,sCulture);
            }          
        }
        else {
            if (price_style == 0) {
                curr_price.innerHTML = def_price;
                var line_now = document.getElementById("line_now");
                if (line_now != null) line_now.style.visibility = "hidden";
            }
            else if (price_style == 2) {
                curr_price.innerHTML = "<font style=\"font-size:larger\"><b>" + def_price + "</b></font>";
                var line_was = document.getElementById("line_was");
                var line_save = document.getElementById("line_save");
                if (line_was != null) line_was.style.visibility = "hidden";
            }
            else {
                curr_price.innerHTML = def_price;
            }
        }
    }
    
    function update_images(idx)
    {
        var oForm = document.forms[0];
        var thumbs_span = document.getElementById("spanThumbsSection_client");
        var image_span = document.getElementById("image_span");
        var oImage = document.getElementById("largeImage");
        thumbs_span.innerHTML = "";
        
        if (idx > -1 && AllowChildImages != 0)
        {         
            if (item_thumbs[idx].length > 1) {
                for (var i = 0; i < Math.min(item_thumbs[idx].length,iMaxThumbnails); i++)
                {
                    thumbs_span.innerHTML += "<img src='"+ item_thumbs[idx][i] + "' onmouseover='UpdateImage(" + i + ");' style='vertical-align:top' alt='thumbnail'>\n";
                }
                
                if (sImages != item_images[idx]) {
                    oImage.src = item_images[idx][0][0];
                    iSelectedThumbsIndex = 0;
                    sImages = item_images[idx];
                    image_span.style.visibility = "visible";
                }                   
            }
            else if (item_thumbs[idx].length == 1) {
                oImage.src = item_images[idx][0][0];
                iSelectedThumbsIndex = 0;
                sImages = item_images[idx];
                image_span.style.visibility = "visible";
            }
            else
            {
                if (def_thumbs.length > 1) {
                    for (var i = 0; i < Math.min(def_thumbs.length,iMaxThumbnails); i++)
                    {
                        thumbs_span.innerHTML += "<img src='"+ def_thumbs[i] + "' onmouseover='UpdateImage(" + i + ");' style='vertical-align:top' alt='thumbnail'>\n";
                    }
                }
                
                if (sImages != def_images) {         
                    if (def_images.length > 0) {
                        oImage.src = def_images[0][0];
                        iSelectedThumbsIndex = 0;
                        sImages = def_images;
                        image_span.style.visibility = "visible";
                    }
                    else {
                        image_span.style.visibility = "hidden";
                    }
                }
            }
        }
        else
        {       
            if (def_thumbs.length > 1) {
                for (var i = 0; i < Math.min(def_thumbs.length,iMaxThumbnails); i++)
                {
                    thumbs_span.innerHTML += "<img src='"+ def_thumbs[i] + "' onmouseover='UpdateImage(" + i + ");' style='vertical-align:top' alt='thumbnail'>\n";
                }
            }
            
            if (sImages != def_images) {         
                if (def_images.length > 0) {
                    oImage.src = def_images[0][0];
                    iSelectedThumbsIndex = 0;
                    sImages = def_images;
                    image_span.style.visibility = "visible";
                }
                else {
                    //this gets the first child item image if present and uses that
                    var firstchildimage = GetFirstChildImage();
                    if (firstchildimage > -1 && AllowChildImages != 0)
                        update_images(firstchildimage);                 
                    else {
                        image_span.style.visibility = "hidden";  
                        //if (item_images.length == 0) image_span.innerHTML = ''; 
                    }
                }
            }    
        }
    }
    
    
    function GetFirstChildImage()
    {
        for (var i=0; i < item_thumbs.length; i++)
        {
            if (item_thumbs[i]!= null && item_thumbs[i].length > 0)
                return i;
        }
        return -1;
    }
    
    
    function GetDecimalDelimiter(sCulture)
    {
       var sRet='';
       switch (sCulture) {
            case 'de-DE':                      
                sRet = ',';
                break;
            case 'fr-FR':   
                sRet = ',';
                break;                
            default:
                sRet = '.';
                break;
        }
      return sRet;
    }
    
    
    function FormatCurrencySymbol(sCulture, sValue)
    {
       var sRet='';
       switch (sCulture) {
            case 'de-DE':                      
                sRet = sValue + '&nbsp;&euro;';
                break;
            case 'fr-FR':   
                sRet = sValue + '&nbsp;&euro;';
                break;
            case 'en-IE':   
                sRet = '&euro;' + sValue;
                break;                
            case 'en-GB':
                sRet = '&pound;' + sValue;
                break;
            default:
                sRet = '$' + sValue
                break;
        }
      return sRet;
    }


    function GetCommaDelimiter(sCulture)
    {
       var sRet='';
       switch (sCulture)
       {
            case 'de-DE':                      
                sRet = '.';
                break;
            case 'fr-FR':       
                sRet = '.';
                break;
            default:
                sRet = ',';
                break;
        }
      return sRet;
    }


    function FormatClean(num)
    {
        var sVal='';
        var nVal = num.length;
        var sChar='';
   
        for(i=0;i<nVal;i++) {
            sChar = num.charAt(i);
            nChar = sChar.charCodeAt(0);
            if ((nChar >=48) && (nChar <=57))  { sVal += num.charAt(i);   }
        }
        return sVal;
    }
 

    function FormatCurrency(num,sCulture)
    {       
        var sVal='';
        var minus='';
        var Decimal='';
        num += ''  // This converts num to string
        Decimal = GetDecimalDelimiter(sCulture);
        //if (num.lastIndexOf("-") == 0) { minus='-'; }
        if (num.lastIndexOf(Decimal) < 0) { num = num + '00'; }
        num = FormatClean(num);
        sVal = minus + FormatDollar(num,GetCommaDelimiter(sCulture)) + GetDecimalDelimiter(sCulture) + FormatCents(num); 
        sVal = FormatCurrencySymbol(sCulture, sVal);
        return sVal;
    }


    function FormatCents(amount)
    {
        var cents = '';
        amount = parseInt(amount,10);
        var samount = new String(amount);

        if (samount.length == 0) { return '00'; }
        if (samount.length == 1) { return '0' + samount; }
        if (samount.length == 2) { return samount; }
         
        cents =  samount.substring(samount.length -2,samount.length);
        return cents;
    }


    function FormatDollar(amount,CommaDelimiter)
    {
        amount = parseInt(amount,10);
        var samount = new String(amount);
        if (samount.length < 3) { return 0; }  
        samount =  samount.substring(0,samount.length -2);
        for (var i = 0; i < Math.floor((samount.length-(1+i))/3); i++) {
            samount = samount.substring(0,samount.length-(4*i+3)) + CommaDelimiter + samount.substring(samount.length-(4*i+3));
        }
        return samount;
    }
