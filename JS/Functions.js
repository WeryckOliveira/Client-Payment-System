$(function(){
    var iAcao = $(".dados input[type='submit']");
    var table = $(".table table .first-tr");
7889
    $(iAcao).click(function(e){
        e.preventDefault();
        var iDescrição = $(".dados input[type='text']").val();
        var iValor = $(".dados input[type='number']").val();
        var iData = $(".dados input[type='date']").val();

        $(table).after("<tr><td>" + iDescrição + "</td><td>R$" + iValor + "</td><td><p class='status'>Pendente</p></td><td class='data'>" + iData + "</td><td><input type='date'/><strong class='remove'>X</strong></td><input type='hidden' value='" + iData + "'/></tr>");

        $(".dados input").val("");
        $(".dados input[type='submit']").val("Adicionar");
        $(".alerts .msg-add").fadeIn(1500);

        setTimeout($(".alerts .msg-add").fadeOut(1000)
        ,3000);

        status();
});

$("#btn-sim").click(function(){
    $(".alerts .msg-remove").fadeIn(1500);

    setTimeout($(".alerts .msg-remove").fadeOut(1000)
    ,3000);
});

    $(".container").click(function(){
        status();
    });

    function status(){
        let tr = $(".table table tr").length;
        var pendente = 0;
        var atrasados = 1;
        var pagos = 1;

        for(let i = 0; i < tr; i++){
            let selectTr = $(".table table tr").eq(i + 1);
            let selectPg = $(selectTr).find("input").val();
            let status = $(selectTr).find(".status");
            var data = $(selectTr).find("input[type='hidden']").attr("value");
            var inputData = $(selectTr).find("input[type='date']").val();
            var date1 = new Date(data);
            var date2 = new Date();
            var diffTime = Math.abs(date2 - date1);
            var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            /***/
            $(".remove").click(function(){
                let closesTr = $(this).closest("tr");
                let descriptionData = $(closesTr).find("td:nth-of-type(1)").html();

                $(".msg-confirm").find("p").html(descriptionData);
                $(".msg-confirm").fadeIn();

                $("#btn-sim").click(function(){
                    $(closesTr).remove();
                    $(".msg-confirm").fadeOut();
                });

                $("#btn-nao").click(function(){
                    $(".msg-confirm").fadeOut();
                });
            });
            /***/
            
            var brData = $(selectTr).find("input[type='hidden']").val().split("-");
            var dataFormatada = brData[2] + "/" + brData[1] + "/" + brData[0];
            var dataAtrasada = 30; //dias até "Atrasado"
            console.log(data)

            $(selectTr).find("input[type='date']").attr("value",inputData);
            $(selectTr).find(".data").html(dataFormatada);
     
            if(selectPg == '' && diffDays <= dataAtrasada){
                $(status).html("Pendente");
                $(status).css("background",'#2196f3');
                $("#pendente p").html(1 + pendente++);
            }else if(selectPg == '' && diffDays > dataAtrasada){
                $(status).html("Atrasado");
                $(status).css("background",'#f44336');
                $("#atrasados p").html(atrasados++);
            }else{
                $(status).html("Pago");
                $(status).css("background",'#4caf50');
                $("#pagos p").html(pagos++);
            }
        }
    }

    /**Pesquisar**/

    var boxSearch = $(".box-search > i");
    var searchOpen = $(".search .search-open");
    var searchInput = $(".search-open input");
    var searchClose = $(".search-open i");

    $(boxSearch).click(function(){
        $(searchOpen).css('display','inline-block');
        $(searchClose).css('display','none');
        $("html,body").find("desc")
        setTimeout(function(){
            $(searchInput).css('width','250px');
        },1);

        setTimeout(function(){
            $(searchClose).css('display','inline-block');
        },500);
        
    });

    $(searchClose).click(function(){
        $(searchInput).css('width','0');
        setTimeout(function(){
            $(searchOpen).css('display','none');
        },500);
    });
    
    var $input = $("input[type='search']"),
    $content = $(".table"),
    $results,
    currentClass = "current",
    offsetTop = 50,
    currentIndex = 0;

  /**Pular para o Elemento**/
  function jumpTo() {
    if ($results.length) {
      var position,
        $current = $results.eq(currentIndex);
      $results.removeClass(currentClass);
      if ($current.length) {
        $current.addClass(currentClass);
        position = $current.offset().top - offsetTop;
        window.scrollTo(0, position);
      }
    }
  }

  /**Procurar a Palavra**/

  $input.on("input", function() {
  	var searchVal = this.value;
    $content.unmark({
      done: function() {
        $content.mark(searchVal, {
          separateWordSearch: true,
          done: function() {
            $results = $content.find("mark");
            currentIndex = 0;
            jumpTo();
          }
        });
      }
    });
  });

  $(searchClose).click(function(){
    $("input[type='search']").val("");
    $content.unmark();
    })
});
