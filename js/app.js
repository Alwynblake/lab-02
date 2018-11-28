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

    .then (Horns.loadHorns)

};

Horns.loadHorns=()=>
  Horns.allHorns.forEach(horn=>(horn.render()));



Horns.prototype.render=function(){

  $('main').append('<section class="clone"></section>');
  let hornClone=$('section[class="clone"]');
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





$(()=>Horns.readJson());
