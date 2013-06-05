function PlaySound(strFileName)
{
   var soundfile = eval("document." + strFileName);
   try
   {
      soundfile.Play();
   }
   catch (e)
   {
      soundfile.DoPlay();
   }
}

function OnGoMenuFormLink(GoList)
{
   var url = GoList.options[GoList.selectedIndex].value;
   var target = GoList.options[GoList.selectedIndex].className;
   GoList.selectedIndex=0;
   GoList.blur();
   if (url)
   {
      NewWin=window.open(url,target);
      window['NewWin'].focus()
   }
}

function popupwnd(url, toolbar, menubar, locationbar, resize, scrollbars, statusbar, left, top, width, height)
{
   if (left == -1)
   {
      left = (screen.width/2)-(width/2);
   }
   if (top == -1)
   {
      top = (screen.height/2)-(height/2);
   }
   var popupwindow = this.open(url, '', 'toolbar=' + toolbar + ',menubar=' + menubar + ',location=' + locationbar + ',scrollbars=' + scrollbars + ',resizable=' + resize + ',status=' + statusbar + ',left=' + left + ',top=' + top + ',width=' + width + ',height=' + height);
}

function ShowObject(id, flag)
{
   var elem=document.getElementById(id);
   if(elem)
      elem.style.visibility=flag?'visible':'hidden';
}

function MoveObject(id, left, top)
{
   var elem=document.getElementById(id);
   if(elem)
   {
      elem.style.left=left+'px';
      elem.style.top=top+'px';
   }
}

function SetImage(id, filename)
{
   var elem=document.getElementById(id);
   if(elem)
   {
      elem.src=filename;
   }
}

function SetStyle(id, className)
{
   var elem=document.getElementById(id);
   if(elem)
   {
      elem.className=className;
   }
}

function Animate(id, left, top, width, height, opacity, duration)
{
   var selector = '#' + id;
   var attributes = new Object();
   if (left != "")
   {
      attributes.left = left;
   }
   if (top != "")
   {
      attributes.top = top;
   }
   if (width != "")
   {
      attributes.width = width;
   }
   if (height != "")
   {
      attributes.height = height;
   }
   if (opacity != "")
   {
      attributes.opacity = opacity/100;
   }
   if (id.indexOf('wb_') == 0)
   {
      var sel = '#' + id.substring(3);
      $(sel).stop().animate(attributes, duration);
   }
   $(selector).stop().animate(attributes, duration);
}

function LoadValue(id, type, prop)
{
   var elem=document.getElementById(id);
   if (elem)
   {
      var storage = window[type + 'Storage'];
      if (!!storage)
      {
         if (storage.getItem(id) != null)
         {
            switch(prop)
            {
            case 1:
               elem.checked = (storage.getItem(id) == "true");
               break;
            case 2:
               elem.selectedIndex = storage.getItem(id);
               break;
            default:
               elem.value = storage.getItem(id);
               break;
            }
         }
      }
   }
}

function StoreValue(id, type, prop)
{
   var elem=document.getElementById(id);
   if (elem)
   {
      var storage = window[type + 'Storage'];
      if (!!storage)
      {
         switch(prop)
         {
         case 1:
            storage.setItem(id, elem.checked);
            break;
         case 2:
            storage.setItem(id, elem.selectedIndex);
            break;
         default:
            storage.setItem(id, elem.value);
            break;
         }
      }
   }
}

function PlayAudio(id)
{
   var elem=document.getElementById(id);
   if(elem)
   {
      elem.play();
   }
}

function PauseAudio(id)
{
   var elem=document.getElementById(id);
   if(elem)
   {
      elem.pause();
   }
}

function StopAudio(id)
{
   var elem=document.getElementById(id);
   if(elem)
   {
      elem.pause();
      elem.currentTime = 0;
   }
}

function ShowObjectWithEffect(id, flag, effect, length, easing)
{
   var selector = '#' + id;
   var options = {};
   var index;
   var directions = new Array();
   directions[0] = "horizontal";
   directions[1] = "vertical";
   directions[2] = "left";
   directions[3] = "right";
   directions[4] = "up";
   directions[5] = "down";
   for (i=0; i<6; i++)
   {
      index = effect.indexOf(directions[i]);
      if (index != -1)
      {
         options = { direction : directions[i] };
         effect = effect.substring(0, index);
      }
   }
   if ($(selector).css('visibility') == 'hidden')
   {
      $(selector).css('display', 'none');
      $(selector).css('visibility', '');
   }
   if (effect == 'fade')
   {
      if (flag == 1)
         $(selector).fadeIn(length);
      else
         $(selector).fadeOut(length);
   }
   else
   {
      if (typeof easing != 'undefined')
      {
         options.easing = easing;
      }
      if (flag == 1)
         $(selector).show(effect, options, length);
      else
         $(selector).hide(effect, options, length);
   }
}

