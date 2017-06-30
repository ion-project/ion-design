(function(){
"use strict";

var Ion = new IonFramework();

var hideOverlay, closeDialog, responsiveDialog, newToast, otherToast, hideToast, closeMenu, wave, ripplePressed, endRipple, hideRipple, endFlatRipple, hideFlatRipple, expansion, hideExpansionPanel, getIndicator, indicatorPosition, refreshIndicator, tabChange, tabContent, lastMousemoveTarget, endTooltip, hideTooltip;

function IonFramework(){
    
    this.version = "0.08.10";

}

window.IonFramework = IonFramework.fn = IonFramework.prototype;

IonFramework.fn.get = function($element, context){
    return new IonSelector($element, context);
}

IonFramework.fn.matches = function($element, selector){
    if($element.matches || $element.matchesSelector || $element.webkitMatchesSelector || $element.mozMatchesSelector || $element.msMatchesSelector || $element.oMatchesSelector){
        return ($element.matches || $element.matchesSelector || $element.webkitMatchesSelector || $element.mozMatchesSelector || $element.msMatchesSelector || $element.oMatchesSelector).call($element, selector);
    }

    return false;
}

IonFramework.fn.isUnique = function(term, array){
    var i = 0,
        unique = true;

    for(; i < array.length; i = i + 1){
        if(term === array[i]){
            unique = false;
        }
    }

    return unique;
}

hideOverlay = function(event){
    if(!event.target.classList.contains("show")){
        Ion.get(event.target).style({"display": "none"});
    }
}

IonFramework.fn.overlay = function(on){
    var $overlay = this.get("#overlay"),
        $newOverlay;

    if(on){
        document.body.classList.add("fixed");

        if($overlay.length){
            $overlay.style({"display": "block"});
            setTimeout(function(){
                $overlay.addClass("show");
            });
        }
        else{
            $newOverlay = document.createElement("DIV");
            $newOverlay.id = "overlay";
            $newOverlay.style.display = "block";

            document.body.appendChild($newOverlay);

            window.getComputedStyle($newOverlay).opacity;

            $newOverlay.className = "show";
        }
    }
    else{
        document.body.classList.remove("fixed");

        if($overlay.length){
            $overlay.removeClass("show");
            
            $overlay.on("transitionend oTransitionEnd mozTransitionEnd webkitTransitionEnd", hideOverlay);
        }
    }
}

IonFramework.fn.getNavbar = function(){
    var $navbar = Ion.get(".navbar")[0];

    if(!$navbar){
        $navbar = document.createElement("ASIDE");
        $navbar.className = "navbar";

        document.body.insertBefore($navbar, document.body.children[0]);

        window.getComputedStyle($navbar).transform;
    }

    return $navbar;
}

IonFramework.fn.navbar = {
    hide: function(){
        var $navbar = Ion.getNavbar();

        Ion.overlay(false);

        $navbar.classList.remove("show");
    },
    show: function(){
        var $navbar = Ion.getNavbar(),
            $overlay;

        Ion.overlay(true);
        $overlay = Ion.get("#overlay");
        $overlay.on("click", Ion.navbar.toggle);

        $navbar.classList.add("show");
    },
    toggle: function(){
        var $navbar = Ion.getNavbar(),
            $overlay;

        if($navbar.classList.toggle("show")){
            Ion.overlay(true);

            $overlay = Ion.get("#overlay");
            $overlay.on("click", Ion.navbar.toggle);
        }
        else{
            Ion.overlay(false);
        }
    }
}

IonFramework.fn.searchbar = {
    fixed: function(event, focus){
        var $searchbar = Ion.get(event.target).parents(".searchbar.fixed")[0];

        if(typeof focus === "undefined"){
            if($searchbar.classList.toggle("show")){
                $searchbar.querySelector(".search-field INPUT").focus();
            }
            else{
                $searchbar.querySelector(".search-field INPUT").blur();
            }
        }
        else if(focus === true){
            $searchbar.classList.add("show");
        }
        else{
            $searchbar.classList.remove("show");
        }
    }
}

IonFramework.fn.card = function(event){
    var $card = Ion.get(event.target);

    Ion.get(".card").removeClass("active");

    if($card.hasClass("card")){
        $card.addClass("active");
    }
    else if(Ion.get(event.target).parents(".card").length){
        Ion.get(event.target).parents(".card").addClass("active");
    }
}

responsiveDialog = function(){
    var $content = Ion.get(".dialog").children(".content")[0];

    Ion.get(".dialog").each(function(){
        this.style.marginTop = - this.offsetHeight / 2 + "px"; 
        this.style.marginLeft = - this.offsetWidth / 2 + "px";

        if($content.scrollHeight > $content.offsetHeight){
            $content.classList.add("scrollable");
        }
        else{
            $content.classList.remove("scrollable");
        }
    });
}

closeDialog = function(){

}

IonFramework.fn.dialog = function(data){
    var $dialog, 
        $header, 
        $title, 
        $subtitle,
        $content,
        $group,
        $affirmative,
        $dismissive,
        $overlay;

    if(data){
        $dialog = document.createElement("DIV");
        $dialog.className = "dialog";

        if(data.title){
            $header = document.createElement("HEADER");

            $title = document.createElement("H1");
            $title.innerHTML = data.title;
            $title.className = "title";

            $header.appendChild($title);

            if(data.subtitle){
                $subtitle = document.createElement("P");
                $subtitle.innerHTML = data.subtitle;
                $subtitle.className = "subheading";

                $header.appendChild($subtitle);
            }

            $dialog.appendChild($header);
        }
        if(data.content){
            $content = document.createElement("DIV");
            $content.className = "content";
            $content.innerHTML = data.content;

            $dialog.appendChild($content);
        }
        if(data.affirmativeText || data.dismissiveText){
            $group = document.createElement("DIV");
            $group.className = "group";

            if(data.affirmativeText){
                $affirmative = document.createElement("BUTTON");
                $affirmative.className = "button flat";
                $affirmative.innerHTML = data.affirmativeText;

                $group.appendChild($affirmative);
            }
            if(data.dismissiveText){
                $dismissive = document.createElement("BUTTON");
                $dismissive.className = "button flat";
                $dismissive.innerHTML = data.dismissiveText;

                $group.appendChild($dismissive);
            }

            $dialog.appendChild($group);
        }
        if(data.class){
            $dialog.classList.add(data.class);
        }

        this.overlay(true);

        $overlay = Ion.get("#overlay");
        $overlay.append($dialog);

        responsiveDialog();

        window.getComputedStyle($dialog).opacity;
        $dialog.classList.add("show");

        Ion.get(window).on("resize", responsiveDialog);
    }
}

hideToast = function(event){
    event.target.remove();
}

otherToast = function(event){
    event.target.remove();
    newToast();
}

IonFramework.fn.toast = function(data){
    var $toast = document.createElement("DIV"),
        $toasts = Ion.get(".toasts"),
        toast = Ion.get(".toast.show");

    data.text = data.text ? data.text : "";
    data.duration = data.duration ? data.duration : false;

    $toast.className = "toast";
    $toast.innerHTML = data.text;

    if($toasts.length){
        $toasts = $toasts[0];
    }
    else{
        $toasts = document.createElement("DIV");
        $toasts.className = "toasts";

        document.body.appendChild($toasts);
    }

    newToast = function(){
        $toasts.appendChild($toast);
        window.getComputedStyle($toast).transform;
        $toast.classList.add("show");

        if(data.duration){
            setTimeout(function(){
                Ion.get($toast).on("transitionend oTransitionEnd mozTransitionEnd webkitTransitionEnd", hideToast);
                $toast.classList.remove("show");
            }, data.duration);
        }
    }

    if(toast.length){
        toast.removeClass("show");
        toast.on("transitionend oTransitionEnd mozTransitionEnd webkitTransitionEnd", otherToast);
    }
    else{
        newToast();
    }
}

IonFramework.fn.menu = function(event){
    var $menu = Ion.get(event.target).parents(".menu");
    
    event.stopPropagation();

    if($menu.length){
        $menu.addClass("show");
    }

    closeMenu = function(event){
        if(event.target != Ion.get(event.target).find(".content")[0]){
            $menu.removeClass("show");
        }
    }

    Ion.get(document).on("click", closeMenu);
}

IonFramework.fn.createEvent = function(name, parameters){
    return new CustomEvent(name, parameters);
}

IonFramework.fn.run = function(){
    var $element;

    Ion.get(document).on("click", function(event){
        $element = Ion.get(event.target);
        Ion.card(event);

        if($element.hasClass("icon") && Ion.get(event.target).parents(".searchbar.fixed").length){
            Ion.searchbar.fixed(event);
        }
        if(event.target.nodeName == "A" && Ion.matches(event.target.parentNode, ".item.expansion")){
            Ion.get(event.target.parentNode).expansionPanel();
        }
        if(event.target.nodeName == "HEADER" && Ion.get(event.target).parents(".expansion-panel").length){
            Ion.get(event.target.parentNode).expansionPanel();
        }
    });

    Ion.get(document).on("mousedown", function(event){
        $element = Ion.get(event.target);

        if($element.hasClass("ripple") || $element.hasClass("button") || $element.hasClass("tab")){
            $element.ripple(event);
        }
        if($element.hasClass("radial") || $element.hasClass("radio") || $element.hasClass("checkbox")){
            $element.flatRipple();
        }
    });

    Ion.get(document).on("mousemove", function(event){
        $element = Ion.get(event.target);

        if($element.getAttr("data-tooltip")){
            $element.tooltip();
        }
    });

    Ion.get(document).on("focus", function(event){
        $element = Ion.get(event.target);

        if(event.target.nodeName == "INPUT" && Ion.get(event.target).parents(".searchbar.fixed").length){
            Ion.searchbar.fixed(event, true);
        }
    }, true);

    Ion.get(document).on("blur", function(event){
        if(event.target.nodeName == "INPUT"){
            Ion.get(event.target).input();
        }
        if(event.target.nodeName == "INPUT" && Ion.get(event.target).parents(".searchbar.fixed").length){
            Ion.searchbar.fixed(event, false);
        }
    }, true);
}

function IonSelector($element, context){
    var classMatch = /^(\.[A-Za-z_-]+[A-Za-z1-9_-]*)$/,
    tagMatch = /^([A-Za-z1-9_-]+)$/,
    idMatch = /^(#[A-Za-z_-]+[A-Za-z1-9_-]*)$/,
    results = null;

    if(!$element){
        return false;
    }

    context = context ? context : document;

    this.length = 0;

    if(typeof $element === "object"){
        this[0] = $element;
        this.length = 1;
    }
    else if(idMatch.test($element)){
        $element = $element.replace("#", "");
        results = context.getElementById($element);

        if(results){
            this[0] = results;
            this.length = 1;
        }
    }
    else{
        if(classMatch.test($element)){
            $element = $element.replace(".", "");
            results = context.getElementsByClassName($element);
        }
        else if(tagMatch.test($element)){
            results = context.getElementsByTagName($element);
        }
        else{
            results = context.querySelectorAll($element);
        }

        this.arrayToObj(results, this);
        this.length = results.length;
    }

    return this;
}

window.IonSelector = IonSelector.fn = IonSelector.prototype;

IonSelector.fn.arrayToObj = function(array, obj){
    var i = 0,
        o;

    for(o in obj){
        delete obj[o];
    }

    for(; i < array.length; i = i + 1){
        obj[i] = array[i];
    }
}

IonSelector.fn.each = function(callback){
    var i = 0;

    for(; i < this.length; i = i + 1){
        callback.call(this[i]);
    }
}

IonSelector.fn.on = function(events, callback, useCapture){
    var i;

    events = events.split(" ");
    useCapture = useCapture ? true : false;

    this.each(function(){
        for(i = 0; i < events.length; i = i + 1){
            this.addEventListener(events[i], callback, useCapture);
        }
    });

    return this;
}

IonSelector.fn.parents = function(selector){
    var parent,
    results = [],
    obj;

    selector = selector ? selector : false;

    this.each(function(){
        parent = this.parentNode;

        while(parent){
            if(Ion.isUnique(parent, results)){
                if(selector){
                    if(Ion.matches(parent, selector)){
                        results.push(parent);
                    }
                }
                else{
                    results.push(parent);
                }
            }

            parent = parent.parentNode;
        }
    });

    obj = new IonSelector();

    this.arrayToObj(results, obj);
    obj.length = results.length;

    return obj;
}

IonSelector.fn.children = function(selector){
    var results = [],
        obj,
        childrens,
        i;

    this.each(function(){
        childrens = this.children;

        if(selector){
            for(i = 0; i < childrens.length; i = i + 1){
                if(Ion.matches(childrens[i], selector) && Ion.isUnique(childrens[i], results)){
                    results.push(childrens[i]);
                }
            }
        }
        else{
            for(i = 0; i < childrens.length; i = i + 1){
                if(Ion.isUnique(childrens[i], results)){
                    results.push(childrens[i]);
                }
            }
        }
    });

    obj = new IonSelector();

    this.arrayToObj(results, obj);
    obj.length = results.length;

    return obj;
}

IonSelector.fn.find = function(selector){
    var results = [],
        obj;

    this.each(function(){
        Ion.get(selector, this).each(function(){
            if(Ion.isUnique(this, results)){
                results.push(this);
            }
        });
    });

    obj = new IonSelector();

    this.arrayToObj(results, obj);
    obj.length = results.length;

    return obj;
}

IonSelector.fn.prev = function(selector){
    var results = [],
        obj,
        prev;

    this.each(function(){
        prev = this.previousElementSibling;

        if(selector){
            while(prev){
                if(Ion.matches(prev, selector) && Ion.isUnique(prev, results)){
                    results.push(prev);
                }

                prev = prev.previousElementSibling;
            }
        }
        else{
            while(prev){
                if(Ion.isUnique(prev, results)){
                    results.push(prev);
                }
                prev = prev.previousElementSibling;
            }
        }
    });

    obj = new IonSelector();

    this.arrayToObj(results, obj);
    obj.length = results.length;

    return obj;
}

IonSelector.fn.next = function(selector){
    var results = [],
        obj,
        next;

    this.each(function(){
        next = this.nextElementSibling;

        if(selector){
            while(next){
                if(Ion.matches(next, selector) && Ion.isUnique(next, results)){
                    results.push(next);
                }

                next = next.nextElementSibling;
            }
        }
        else{
            while(next){
                if(Ion.isUnique(next, results)){
                    results.push(next);
                }
                next = next.nextElementSibling;
            }
        }
    });

    obj = new IonSelector();

    this.arrayToObj(results, obj);
    obj.length = results.length;

    return obj;
}

IonSelector.fn.i = function(index){
    if(this[index]){
        return Ion.get(this[index]);
    }
}

IonSelector.fn.position = function(){
    var $element = this[0],
        position = {x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0};

    if($element){
        if(typeof $element.getBoundingClientRect === "undefined"){
            while($element){
                position.x = position.x + ($element.offsetLeft - $element.scrollLeft + $element.clientLeft);
                position.y = position.y + ($element.offsetTop - $element.scrollTop + $element.clientTop);

                $element = $element.offsetParent;
            }
        }
        else{
            position.x = position.left = $element.getBoundingClientRect().left;
            position.y = position.top = $element.getBoundingClientRect().top;
            position.right = $element.getBoundingClientRect().right;
            position.bottom = $element.getBoundingClientRect().bottom;
        }

        return position;
    }
}

IonSelector.fn.style = function(styles){
    var ref = this,
        props;

    if(typeof styles === "object"){

        props = Object.getOwnPropertyNames(styles);

        props.forEach(function(prop, index, array){
            ref.each(function(){
                this.style[prop] = Object.getOwnPropertyDescriptor(styles, prop).value;
            });
        });
    }

    return this;
}

IonSelector.fn.addClass = function(classes){
    var i;

    classes = classes.split(" ");

    this.each(function(){
        for(i = 0; i < classes.length; i = i + 1){
            this.classList.add(classes[i]);
        }
    });

    return this;
}

IonSelector.fn.toggleClass = function(classes){
    var i;

    classes = classes.split(" ");

    this.each(function(){
        for(i = 0; i < classes.length; i = i + 1){
            this.classList.toggle(classes[i]);
        }
    });

    return this;
}

IonSelector.fn.removeClass = function(classes){
    var i;

    classes = classes.split(" ");

    this.each(function(){
        for(i = 0; i < classes.length; i = i + 1){
            this.classList.remove(classes[i]);
        }
    });

    return this;
}

IonSelector.fn.hasClass = function(classes){
    var i, result = true;

    classes = classes.split(" ");

    if(this.length){
        this.each(function(){
            for(i = 0; i < classes.length; i = i + 1){
                if(!this.classList.contains(classes[i])){
                    result = false;
                }
            }
        });

        return result;
    }
    else{
        return false;
    }
}

IonSelector.fn.getAttr = function(attribute){
    if(this[0]){
        return this[0].getAttribute(attribute);
    }
}

IonSelector.fn.setAttr = function(attribute, value){
    this.each(function(){
        this.setAttribute(attribute, value);
    });

    return this;
}

IonSelector.fn.removeAttr = function(attributes){
    var i;

    attributes = attributes.split(" ");

    this.each(function(){
        for(i = 0; i < attributes.length; i = i + 1){
            this.removeAttribute(attributes[i]);
        }
    });

    return this;
}

IonSelector.fn.append = function($element){
    this.each(function(){
        this.appendChild($element);
    });
}

IonSelector.fn.remove = function(){
    this.each(function(){
        this.remove();
    });
}

IonSelector.fn.input = function(){
    var $input = this[0];

    if($input){
        if($input.value == ""){
            $input.classList.remove("active");
        }
        else{
            $input.classList.add("active");
        }
    }
}

endRipple = function(event){
    var prev, aux;

    prev = event.target.previousElementSibling;

    while(prev){
        aux = prev;
        prev = prev.previousElementSibling;
        aux.remove();
    }

    if(!ripplePressed){
        event.target.remove();
    }
}

hideRipple = function(){
    var $wave = Ion.get(wave);

    $wave.style({
        "opacity": "0",
        "transform": "scale(3)"
    });

    ripplePressed = false;
}

IonSelector.fn.ripple = function(event){
    var $element = this[0],
        $wave = document.createElement("SPAN"),
        properties = {
            x: 0,
            y: 0,
            scale: 0
        },
        position;

    if($element){
        ripplePressed = true;

        position = Ion.get($element).position();

        properties.scale = Math.max($element.clientWidth, $element.clientHeight);
        properties.x = event.clientX - position.x - properties.scale / 2;
        properties.y = event.clientY - position.y - properties.scale / 2;

        $wave.className = "wave";
        $wave.style.top = properties.y + "px";
        $wave.style.left = properties.x + "px";
        $wave.style.width = properties.scale + "px";
        $wave.style.height = properties.scale + "px";

        Ion.get($element).append($wave);

        window.getComputedStyle($wave).transform;
        $wave.style.transform = "scale(3)";

        wave = $wave;
        
        Ion.get($element).on("mouseup touchend touchcancel mouseleave", hideRipple);
        Ion.get($wave).on("transitionend oTransitionEnd mozTransitionEnd webkitTransitionEnd", endRipple);
    }
}

endFlatRipple = function(event){
    var prev, aux;

    prev = event.target.previousElementSibling;

    while(prev){
        aux = prev;
        prev = prev.previousElementSibling;

        if(aux.classList.contains("wave")){
            aux.remove();
        }
    }

    if(!ripplePressed){
        event.target.remove();
    }
}

hideFlatRipple = function(){
    var $wave = Ion.get(wave);

    $wave.style({
        "opacity": "0",
        "transform": "scale(1)"
    });

    ripplePressed = false;
}

IonSelector.fn.flatRipple = function(){
    var $element = this[0],
        $wave = document.createElement("SPAN");

    if($element){
        ripplePressed = true;

        $wave.className = "wave";

        Ion.get($element).append($wave);

        window.getComputedStyle($wave).transform;
        $wave.style.transform = "scale(1)";

        Ion.get($element).on("mouseup touchend touchcancel mouseleave", hideFlatRipple);
        Ion.get($wave).on("transitionend oTransitionEnd mozTransitionEnd webkitTransitionEnd", endFlatRipple);
    }
}

hideExpansionPanel = function(event){
    var $element = Ion.get(event.target).parents(".item.expansion, .expansion-panel .item");

    if(!expansion){
       $element.removeClass("active"); 
    }
}

IonSelector.fn.expansionPanel = function(){
    var $element = this[0],
        $content = $element.querySelector(".content"), 
        contentHeight;

    if($content){
        if($element.classList.contains("active")){
            expansion = false;
            contentHeight = $content.offsetHeight;
            $content.style.height = contentHeight + "px";

            window.getComputedStyle($content).height;

            $content.style.height = "0px";

            Ion.get($content).on("transitionend oTransitionEnd mozTransitionEnd webkitTransitionEnd", hideExpansionPanel);
        }
        else{
            expansion = true;
            $content.style.height = "auto";

            $element.classList.add("active");
            contentHeight = $content.offsetHeight;
            $content.style.height = "0px";

            window.getComputedStyle($content).height;

            $content.style.height = contentHeight + "px";
        }

        if(Ion.get($element).parents(".expansion-panel").length){
            document.body.scrollTop = $element.offsetTop;
        }
    }
}

getIndicator = function($tabs){
    var $indicator = $tabs.querySelector(".indicator");

    if(!$indicator){
        $indicator = document.createElement("SPAN");
        $indicator.className = "indicator";

        $tabs.appendChild($indicator);
    }

    return $indicator;
}

indicatorPosition = function($indicator, $active, $tabs){
    $indicator = Ion.get($indicator);

    $indicator.style({
        "left": $active.position().left + $tabs.scrollLeft - Ion.get($tabs).position().left + "px",
        "right": Ion.get($tabs).position().right - $tabs.scrollLeft - $active.position().right + "px"
    });
}

refreshIndicator = function(){
    var $indicator,
        $active;

    Ion.get(".tabs").each(function(){
        $indicator = getIndicator(this);
        $active = Ion.get(this).find(".tab.active");

        indicatorPosition($indicator, $active, this);
    });
}

tabChange = function(event){
    var $tab = Ion.get(event.target),
        $tabs = Ion.get(event.target).parents(".tabs"),
        $indicator = Ion.get(event.target).parents(".tabs").find(".indicator"),
        $active = Ion.get(event.target).parents(".tabs").find(".tab.active");

    if($tab.hasClass("tab")){
        if($active.position().left > $tab.position().left){
            $indicator.removeClass("left");
            $indicator.addClass("right");
        }
        else{
            $indicator.removeClass("right");
            $indicator.addClass("left");
        }

        $active.removeClass("active");
        $tab.addClass("active");

        tabContent($tabs.getAttr("data-tabs"), $tab.getAttr("data-tab-id"));

        indicatorPosition($indicator[0], $tab, $tabs[0]);
    }
}

tabContent = function($contents, id){
    Ion.get("#" + $contents).children().removeClass("show");
    Ion.get("#" + $contents).children("#" + id).addClass("show");
}

IonSelector.fn.tabs = function(){
    var $tab,
        $active,
        $indicator;

    this.each(function(){
        $tab = Ion.get(this).find(".tab");
        $active = Ion.get(this).find(".tab.active");
        $indicator = getIndicator(this);

        if($tab.length){
            if(!$active.length){
                $active = Ion.get($tab[0]);
            }

            indicatorPosition($indicator, $active, this);
            tabContent(this.getAttribute("data-tabs"), $active.getAttr("data-tab-id"));

            Ion.get(this).on("click", tabChange);
            Ion.get(window).on("resize", refreshIndicator);
        }
    });
}

endTooltip = function(event){
    event.target.remove();
    event.target.removeEventListener("transitionend oTransitionEnd mozTransitionEnd webkitTransitionEnd", endTooltip);
}

IonSelector.fn.tooltip = function(){
    var $element = this[0],
        $tooltip,
        orientation,
        position;

    if($element && $element != lastMousemoveTarget){
        lastMousemoveTarget = $element;

        $tooltip = document.createElement("DIV");
        $tooltip.className = "tooltip";
        $tooltip.innerHTML = this.getAttr("data-tooltip");

        orientation = this.getAttr("data-position");
        position = this.position();

        document.body.appendChild($tooltip);

        switch(orientation){
            case "top":
                $tooltip.classList.add("top");

                position.x = position.x + $element.offsetWidth / 2 - $tooltip.offsetWidth / 2;
                position.y = position.y - $tooltip.offsetHeight;
            break;
            case "right":
                $tooltip.classList.add("right");

                position.x = position.x + $element.offsetWidth;
                position.y = position.y + $element.offsetHeight / 2 - $tooltip.offsetHeight / 2;
            break;
            case "left":
                $tooltip.classList.add("left");

                position.x = position.x - $tooltip.offsetWidth;
                position.y = position.y + $element.offsetHeight / 2 - $tooltip.offsetHeight / 2;
            break;
            default:
                $tooltip.classList.add("bottom");

                position.x = position.x + $element.offsetWidth / 2 - $tooltip.offsetWidth / 2;
                position.y = position.y + $element.offsetHeight;
            break;
        }

        $tooltip.style.top = position.y + document.body.scrollTop + "px";
        $tooltip.style.left = position.x + document.body.scrollLeft + "px";

        window.getComputedStyle($tooltip).opacity;

        $tooltip.classList.add("show");

        hideTooltip = function(){
            $tooltip.classList.remove("show");

            lastMousemoveTarget = null;

            Ion.get($tooltip).on("transitionend oTransitionEnd mozTransitionEnd webkitTransitionEnd", endTooltip)
        }

        Ion.get($element).on("mouseout", hideTooltip);
    }
}

IonSelector.fn.emit = function(event){
    this.each(function(){
        this.dispatchEvent(event);
    });
}

IonSelector.fn.copyToClipboard = function(){
    var $element = this[0],
        selection,
        range;

    if($element){
        selection = window.getSelection();

        range = document.createRange();
        range.selectNodeContents($element);

        selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand("copy");
    }
}

Ion.run();

window.Ion = Ion;

})();

(function(){
    if(typeof window.CustomEvent === "function"){
        return false;
    }
    
    function CustomEvent(event, parameters){
        var e;

        parameters = parameters || {bubbles: false, cancelable: false, detail: undefined};

        e = document.createEvent(event);
        e.initCustomEvent(event, parameters.bubbles, parameters.cancelable, parameters.detail);
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();