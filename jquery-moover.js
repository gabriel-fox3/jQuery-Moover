(function($) {

    $.fn.moover = function(options) {

        var default_sens = 4;

        // var settings = $.extend({}, defaults, options);

        return this.each(function() {

            console.log(options.elements);

            if (!options.elements) {
                console.error('jQuery-Moover.js: você precisa especificar pelo menos um elemento.');
                return false;
            }

            var default_transform = [];
            for (let el of options.elements) {
                default_transform.push($(el.selector).css('transform'));
            }

            var $this = this;
            $(this).on('mousemove', function(ev) {
                let width = $($this).outerWidth();
                let height = $($this).outerHeight();
                let x = ev.pageX - $($this).offset().left;
                let y = ev.pageY - $($this).offset().top;
                // calculo pega o tamanho real do elemento principal, divide 
                // por dois para obter a metade e subtrai a posição atual do mouse
                // sobre o elemento. depois, divide por 100 para obter uma porcentagem pequena. 
                let calc_x = ((width / 2) - x) / 100;
                let calc_y = ((height / 2) - y) / 100;

                // let imgs = $('#teste img');
                for (let i = 0; i < options.elements.length; i++) {
                    let el = options.elements[i];
                    // multiplica por 3 para aumentar a sensibilidade e por -1 para inverter o calculo
                    let old_transform = default_transform[i] == 'none' ? '' : default_transform[i];
                    let final_x = (calc_x * el.sensitivity) * (0 - 1);
                    let final_y = (calc_y * el.sensitivity) * (0 - 1);
                    if (el.revert && el.revert == true) {
                        final_x = final_x * (0 - 1);
                        final_y = final_y * (0 - 1);
                    }
                    $(el.selector).attr('style', `transform: translate(${final_x}%, ${final_y}%) ${old_transform};`);
                }

                // multiplica por 3 para aumentar a sensibilidade e por -1 para inverter o calculo
                // $(imgs[0]).attr('style', `transform: translate(${(calc_x * 3) * (0-1)}%, ${(calc_y * 3) * (0-1)}%);`);
                // $(imgs[1]).attr('style', `transform: translate(${(calc_x / 4) * (0-1)}%, ${(calc_y / 4) * (0-1)}%);`);
            });

        });

    }

})(jQuery)