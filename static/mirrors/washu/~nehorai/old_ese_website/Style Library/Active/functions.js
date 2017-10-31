// http://www.htmldog.com/articles/suckerfish/

sfHover = function() {
	var sfEls = document.getElementById("nav").getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			this.className+=" sfhover";
		}
		sfEls[i].onmouseout=function() {
			this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
		}
	}
}
if (window.attachEvent) window.attachEvent("onload", sfHover);

// add/remove classes

function toggleClass(target,classValue){
	var pattern = new RegExp("(^| )" + classValue + "( |$)");

	if(!pattern.test(target.className)){
		if(target.className == ""){
			target.className == classValue;
		}else{
			target.className += " " + classValue;
		}
	}else{
		removeClass(target,classValue)
	}
	
	return true;
}

function removeClass(target, classValue){
	var removedClass = target.className;
	var pattern = new RegExp("(^| )" + classValue + "( |$)");
	
	removedClass = removedClass.replace(pattern, "$1");
	removedClass = removedClass.replace(/ $/, "");
	
	target.className = removedClass;
	
	return true;
}

function CalendarViewTypeClass(target)
{
    
    
    var month=document.getElementsByName('month');
    var week=document.getElementsByName('week');
    var day=document.getElementsByName('day');
    
    
    if (month.length == 1 && week.length == 1 && day.length == 1){
        if (target.name == "day")
        {
            month[0].className = "";
            week[0].className = "";
            target.className = "active"
        }
        else if (target.name == "month")
        {   
            target.className = "active";
            week[0].className = "";
            day[0].className = ""
        }
        else
        {
            month[0].className = "";
            target.className = "active";
            day[0].className = ""
        }

    }
}

function ClearSearch(theText) 
{
     if (theText.value == "Search Engineering")
     {
         theText.value = ""
     }
}

// jquery hooks
	
	$(document).ready(function() {
		
		// set hovers to automatically load image with -o suffix
		$(".rollover").each(function() {   	
			this.default_src = this.src;
			this.rollover_src = this.default_src.substring(0, this.default_src.length - 4) + "_o.gif";   	
			$(this).hover(function() {
				this.src = this.rollover_src;
			}, function() {
				this.src = this.default_src;
			});   	
		});
		
		// preload hover images
		$(".rollover").each(function() {   	
			$("<img src='" + this.rollover_src + "' alt='' />");
		});   	
		
		// set clear fields
		
		$(".clear-field").each(function() {
			$(this).focus(function() { if (this.defaultValue==this.value) this.value = ""; });
			$(this).blur(function() { if (this.value=="") this.value = this.defaultValue; });
		});
		
	});
	