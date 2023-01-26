<script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.3.min.js" integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=" crossorigin="anonymous"></script>
<script>
     // Swiper Slider
     var swiper = new Swiper(".swiper-slider", {
       navigation: {
         nextEl: ".swiper-button-next",
         prevEl: ".swiper-button-prev",
       },
     });


     // Now On change of variant
    $(document).ready(function(){
      $(document).on('click', 'input.color-btn', function(){
        $('input.color-btn').removeAttr('checked', 'checked');
        if($(this).attr('checked') != 'checked'){
          $(this).attr('checked', 'checked');
        }
        if($(this).is(':checked')){
          var dataColor = $(this).attr('data-color');
        }
        $(this).parents('.grid__item').find('img.image-collection').each(function(){
          var imageColor = $(this).attr('data-color');
          if(imageColor == dataColor){
            $(this).parents('.custom-product-image').css('display', 'block');
          }
          else{
            $(this).parents('.custom-product-image').css('display', 'none');
          }
        });
      });



    // Add to Cart
    $(document).on('click', '.addcart', function(e){
      e.preventDefault();
      var sizeValue = $(this).val();
      var imageColor = $(this).parents('.grid__item').find('input.color-btn[checked="checked"]').attr('data-color');
      var dataVariant = sizeValue +' / '+ imageColor;
      // console.log(dataVariant);
      $(this).parents('form').find('.variant-select__select option').each(function(){
        var variant = $(this).val();
        if($(this).attr('data-variant') == dataVariant){
          $('input[name="id"]').val(variant);
        }
      });
       setTimeout(function(){
          $.ajax({
            type: 'POST',
            url: '/cart/add',
            data: {
              id: $('input[name="id"]').val()
            },
            dataType: 'json',
            success: function(data){
              console.log('Added');
            }
           });
        },500);


      });
    });
</script>
