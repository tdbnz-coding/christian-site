/**
 * TheBible.life Verse of the Day
 *
 * Display a bible verse nominated for verse of the day from TheBible.life
 *
 * Author Bryant Sharp - Cyber Oceans LLC.
 */



function tb_verse_of_the_day(type, callback) {

    var container1 = document.getElementById('the-bible-life-verse-of-the-day');
    
    var spinner = document.createElement('img');
    spinner.setAttribute('id', 'votd-spinner1');
    spinner.setAttribute('src', 'https://thebible.life/images/widgets/spinner1a.gif');
    spinner.setAttribute('title', 'Loading Bible Verse Of The Day From TheBible.life');
    spinner.setAttribute('align','middle');
    spinner.style.display = 'block';
    container1.appendChild(spinner);

    function callbackwidget1(response1, obj) {

        /*add style sheet*/
        var head = document.getElementsByTagName('head')[0];
        var csslink = document.createElement('link');
        csslink.type = 'text/css';
        csslink.rel = 'stylesheet';
        csslink.href = 'https://thebible.life/css/widgets.css';
        head.appendChild(csslink);

        /*remove spinner*/
        if (document.getElementById('votd-spinner1') !== null) {
            document.getElementById("votd-spinner1").remove();
        }

        /*add verse from json data*/
        var verse = JSON.parse(response1);
        var p = document.createElement('p');
        //p.innerHTML = verse.verseText + '<br/>&mdash; ' + verse.bookName + ' ' + verse.chapterNumber + ':' + verse.verseNumber;
        p.innerHTML = verse.VerseText + '<br/>&mdash; ' + verse.BookName + ' ' + verse.ChapterNumber + ':' + verse.VerseNumber;

        container1.appendChild(p);

    }//end of cb

	/*
	 * 
	 * Set up the AJAX request, call the callback function,
	 * and take care of any error handling we need to do.
	 * 
	 */
    try {
        var request1 = new (this.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
        request1.open('GET', 'https://thebible.life/widget/VerseOfTheDayWidget?type=' + type, 1);
        request1.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        request1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        request1.onreadystatechange = function () {
            
            if (request1.readyState > 3) {

                callbackwidget1(request1.responseText, request1);

                var span = document.createElement('span');
                span.innerHTML = ' <a href="https://thebible.life/bible-verse-of-the-day-widget-for-your-site" target="_blank" title="TheBible.life Free Online Bible Study Web Site">TheBible.life</a>';
                container1.appendChild(span);
            }
        };

        request1.send();
    }
    catch (e) {
        window.console && console.log(e);
    }
    
    
}