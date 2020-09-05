// script.js

function generateCode() {
	var codeType = getCodeType();
	$('#output').attr('disabled', false);

	// produce FS output
	if (codeType == 'paragraph' || codeType == 'ordered_list') {
		var snippet = '{{ sgMacro.render_ftSnippet({ header: "' + $('#input-header').val() + '", content_type: "' + codeType + '", list: { items : [ ' + makeOrderedList(codeType) + ' ] }, paragraph: { content: ' + makeParagraph(codeType) + ' } }) }}';
		$('#output').val(snippet);	
	}

	//produce code block output
	else {
		var codeBlock = "{% call highlightSyntax('" + codeType + "') %}\n" + $('#input-content').val() + "\n{% endcall %}";
		$('#output').val(codeBlock);
	}
}

function getCodeType() {
	if ($('#radio-paragraph').is(':checked')) { return 'paragraph'; }
	if ($('#radio-ordered-list').is(':checked')) { return 'ordered_list'; }
	if ($('#radio-html').is(':checked')) { return 'html'; }
	if ($('#radio-css').is(':checked')) { return 'css'; }
	if ($('#radio-js').is(':checked')) { return 'js'; }
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

function buttonSet(selected) {
	$('#radio-paragraph, #radio-ordered-list, #radio-html, #radio-css, #radio-js').prop('checked', false);
	$('#output').val('').attr('disabled', true);

	switch (selected) {
		case 'paragraph':
			$('#radio-paragraph').prop('checked', true);
			$('#input-header').attr('placeholder', 'FS header').attr('disabled', false);
			$('#input-content').attr('placeholder', 'FS content');
			break;
		case 'list':
			$('#radio-ordered-list').prop('checked', true);
			$('#input-header').attr('placeholder', 'FS header').attr('disabled', false);
			$('#input-content').attr('placeholder', 'FS content (one item per line)');
			break;
		case 'html':
			$('#radio-html').prop('checked', true);
			$('#input-header').val('').attr('disabled', true);
			$('#input-content').attr('placeholder', 'HTML code'); 
			break;
		case 'css':
			$('#radio-css').prop('checked', true);
			$('#input-header').val('').attr('disabled', true);
			$('#input-content').attr('placeholder', 'CSS code'); 
			break;
		case 'js':
			$('#radio-js').prop('checked', true);
			$('#input-header').val('').attr('disabled', true);
			$('#input-content').attr('placeholder', 'JS code'); 
			break;
		default: return 1;
	}
}

function copySnippet() {
	if (!$('#output').val()) { return; }
	$('#output').select();
	document.execCommand('copy');
	$('#copy-confirm').hide().fadeIn(250).delay(500).fadeOut(250);
}