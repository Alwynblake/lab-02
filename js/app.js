'use strict';

function Horns(horn){

  this.image_url=horn.image_url;
  this.title=horn.title;
  this.description=horn.description;
  this.keyword=horn.keyword;
  this.horns=horn.horns;

}


Horns.allHorns=[];


Horns.readJson=()=>{

  $.get('./data/page-1.json','json')

    .then(data=>{

      data.forEach(horn=>{
        Horns.allHorns.push(new Horns(horn))
      })
    })

    .then (Horns.loadHorns).then(Horns.imgselect)

};

Horns.loadHorns=()=>
  Horns.allHorns.forEach(horn=>(horn.render()));



Horns.prototype.render=function(){

  $('main').append('<div class="clone"></div>');
  let hornClone=$('div[class="clone"]');
  let hornHtml=$('#photo-template').html();
  hornClone.html(hornHtml);

  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src',this.image_url);
  hornClone.find('p').text(this.description);
  hornClone.find('p').text(this.keyword);
  hornClone.find('p').text(this.horns);
  hornClone.removeClass('clone');
  hornClone.attr('class',this.keyword);

}

Horns.imgselect=function(){

  let newarr=[];
  Horns.allHorns.forEach(item=>{

    if(!newarr.includes(item.keyword)){

      $('select').append('<option class="clone"></option>');
      let opt=$('option[class="clone"]');
      opt.text(item.keyword);
      newarr.push(item.keyword);
      opt.removeClass('clone');
    }
  })

}


$('select').on('change',popimg);
function popimg(){

  let selecteditem=$(this).val();

  //   $('div').not('.'+selecteditem).hide();

  //   $('.'+selecteditem).show();
  $('div').show();
  if(selecteditem!==''){
    $('div').not('[class*="'+selecteditem+'"]').hide();
  }



}


$(()=>Horns.readJson());
