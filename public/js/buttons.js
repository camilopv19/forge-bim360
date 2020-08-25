$(document).ready(function () {
    var row = $(".row").children();

    $('#powerbi').on('click',function () {
        var bool = $("#indicadores").is(":hidden")
        var label = bool? 'Visor BIM' : 'Indicadores';
        $("#forgeViewer").attr('hidden', bool)
        $("#indicadores").attr('hidden', !bool)
        document.getElementById('powerbi').innerHTML = label;

        document.getElementById("fecha").innerHTML = '';
        document.getElementById("fechacap").innerHTML = '';
        document.getElementById("eav").innerHTML = '';
        document.getElementById("pav").innerHTML = '';
        document.getElementById("txt").innerHTML = '';
        document.getElementById("ea").innerHTML = '';
        document.getElementById("pa").innerHTML = '';
        document.getElementById("currSelect").innerHTML = '';

        /** Animate + contract tree */
        $(row[0]).removeClass('col-sm-4').addClass('col-sm-2 transition-width');
        $(row[1]).removeClass('col-sm-8').addClass('col-sm-10 transition-width').after('<div class="col-sm-2 transition-width" id="indicadores"></div>');

    });

    $('#expande').on('click',function () {
    });


})