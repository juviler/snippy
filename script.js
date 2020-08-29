// script.js

function generateSnippet() {
	var snippetType = getSnippetType();
	var snippet = '{{ sgMacro.render_ftSnippet({ header: "' + $('#input-header').val() + '", content_type: "' + snippetType + '", list: { items : [ ' + makeOrderedList(snippetType) + ' ] }, paragraph: { content: ' + makeParagraph(snippetType) + ' } }) }}';
	$('#output').val(snippet);
}

function getSnippetType() {
	if ($('#radio-paragraph').is(':checked')) { return 'paragraph'; }
	if ($('#radio-ordered-list').is(':checked')) { return 'ordered_list'; }
	else return 1;
}

function makeOrderedList(snippetType) {
	if (snippetType != 'ordered_list') { return '""'; };
	
	var inputStr = $('#input-content').val().replace(/(\r\n|\n|\r)/gm,'\n'), retStr = '', tempStr = '';
	var listItems = [];

	// create array from string, items separated by line breaks
	for (i = 0; i <= inputStr.length; i++) {
		if (i == inputStr.length) { listItems.push(tempStr); } // final list item
		else if (inputStr[i] == '\n') {
			listItems.push(tempStr);
			tempStr = '';
		}
		else tempStr += inputStr[i];
	}
	// make code string from array of items
	for (i = 0; i < listItems.length; i++) {
		retStr += '"' + listItems[i] + '"';
		if (i != listItems.length - 1) { retStr += ', '; }
	}
	return retStr;
}

function makeParagraph(snippetType) {
	if (snippetType != 'paragraph') { return '""'; };
	return '"' + $('#input-content').val().replace(/(\r\n|\n|\r)/gm,' ') + '"';
}

function setToParagraph() {
	$('#radio-paragraph').prop('checked', true);
	$('#radio-ordered-list').prop('checked', false);
	$('#input-content').attr('placeholder', 'content');
}

function setToOrderedList() {
	$('#radio-paragraph').prop('checked', false);
	$('#radio-ordered-list').prop('checked', true);	
	$('#input-content').attr('placeholder', 'content (one item per line)');
}

function copySnippet() {
	if (!$('#output').val()) { return; }
	$('#output').select();
	document.execCommand('copy');
	$('#copy-confirm').hide().fadeIn(250).delay(500).fadeOut(250);
}



