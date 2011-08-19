/*!
 * This file is part of Aloha Editor
 * Author & Copyright (c) 2010 Gentics Software GmbH, aloha@gentics.com
 * Licensed unter the terms of http://www.aloha-editor.com/license.html
 */

define("editabletest",
['aloha/jquery', 'testutils'],
function(aQuery, TestUtils, undefined) {
	"use strict";
	
/**
 * Do an enter test
 * @param editable the editable
 * @param container cursor container
 * @param offset offset of the cursor position
 * @param shift true for shift enter, false for normal enter
 * @param twice true for pressing enter twice, false for once
 * @param reference result selector
 */
function doEnterTest(editable, container, offset, shift, twice, reference) {
	// set cursor
	TestUtils.setCursor(editable, container, offset);
	// press enter
	TestUtils.pressEnter(editable, shift);
	// possibly again
	if (twice) {
		TestUtils.pressEnter(editable, shift);
	}
	// get the result
	
	 var result = Aloha.editables[0].getContents(true);

	var expected = $(reference).contents();

	// compare the result with the expected result
	deepEqual(result.extractHTML(), expected.extractHTML(), 'Check Operation Result');
}

	// Prepare
	var	$ = window.jQuery,
		$body = $('body');
	// Test whether Aloha is properly initialized
	/*
	  Note: this test is currently necessary, because it will catch the initial 'aloha' Event.
	  In the event handler of this event, due to a Bug Aloha will NOT YET be initialized, so if any test would fail when run then.
	 */
	asyncTest('Aloha Startup Test', function() {
		var timeout = setTimeout(function() {
			ok(false, 'Aloha was not initialized within 60 seconds');
			start();
		}, 60000);
		aQuery('body').bind('aloha',function() {
			ok(true, 'Aloha Event was fired');
			clearTimeout(timeout);
			start();
		});
	});

	aQuery('body').bind('aloha', function() {

		module('Plaintext Enter Handling', {
			setup: function() {
				// get the editable area and the reference
				this.edit = aQuery('#edit');
				this.ref = aQuery('#ref-plaintext');
				// fill the editable area with the reference
				this.edit.html(this.ref.html());
				// aloha'fy the editable
				this.edit.aloha();
			},
			teardown: function() {
				// de-aloha'fy the editable
				this.edit.mahalo();
			}
		});

		// Test pressing Enter at beginning of plain text
		test('Enter at beginning', function() {
			doEnterTest(this.edit, this.edit.contents().get(0), 0, false, false, '#ref-plaintext-start-enter');
		});

                // Test pressing Enter twice at beginning of plain text
		test('Double Enter at beginning', function() {
			doEnterTest(this.edit, this.edit.contents().get(0), 0, false, true, '#ref-plaintext-start-dblenter');
		});

                // Test pressing Enter in the middle of plain text
		test('Enter in the middle', function() {
			doEnterTest(this.edit, this.edit.contents().get(0), 10, false, false, '#ref-plaintext-mid-enter');
		});

                // Test pressing Enter twice in the middle of plain text
		test('Double Enter in the middle', function() {
			doEnterTest(this.edit, this.edit.contents().get(0), 10, false, true, '#ref-plaintext-mid-dblenter');
		});

                // Test pressing Enter at the end of plain text
		test('Enter at end', function() {
			doEnterTest(this.edit, this.edit.contents().get(0), 18, false, false, '#ref-plaintext-end-enter');
		});

                // Test pressing Enter twice at the end of plain text
		test('Double Enter at end', function() {
			doEnterTest(this.edit, this.edit.contents().get(0), 18, false, true, '#ref-plaintext-end-dblenter');
		});

		module('Heading Enter Handling', {
			setup: function() {
				// get the editable area and the reference
				this.edit = aQuery('#edit');
				this.ref = aQuery('#ref-heading');
				// fill the editable area with the reference
				this.edit.html(this.ref.html());

				// aloha'fy the editable
				this.edit.aloha();
			},
			teardown: function() {
				// de-aloha'fy the editable
				this.edit.mahalo();
			}
		});

		test('Enter at start', function() {
			doEnterTest(this.edit, this.edit.find('h1').contents().get(0), 0, false, false, '#ref-heading-start-enter');
		});

		test('Double Enter at start', function() {
			doEnterTest(this.edit, this.edit.find('h1').contents().get(0), 0, false, true, '#ref-heading-start-dblenter');
		});

		test('Enter in middle', function() {
			doEnterTest(this.edit, this.edit.find('h1').contents().get(0), 3, false, false, '#ref-heading-mid-enter');
		});

		test('Double Enter in middle', function() {
			doEnterTest(this.edit, this.edit.find('h1').contents().get(0), 3, false, true, '#ref-heading-mid-dblenter');
		});

		test('Enter in bold', function() {
			doEnterTest(this.edit, this.edit.find('b').contents().get(0), 2, false, false, '#ref-heading-bold-enter');
		});

		test('Double Enter in bold', function() {
			doEnterTest(this.edit, this.edit.find('b').contents().get(0), 2, false, true, '#ref-heading-bold-dblenter');
		});

		test('Enter at end', function() {
			doEnterTest(this.edit, this.edit.find('h1').contents().last().get(0), 8, false, false, '#ref-heading-end-enter');
		});

		test('Double Enter at end', function() {
			doEnterTest(this.edit, this.edit.find('h1').contents().last().get(0), 8, false, true, '#ref-heading-end-dblenter');
		});

		module('Heading Shift Enter Handling', {
			setup: function() {
				// get the editable area and the reference
				this.edit = aQuery('#edit');
				this.ref = aQuery('#ref-heading');
				// fill the editable area with the reference
				this.edit.html(this.ref.html());

				// aloha'fy the editable
				this.edit.aloha();
			},
			teardown: function() {
				// de-aloha'fy the editable
				this.edit.mahalo();
			}
		});

		test('Shift Enter at start', function() {
			doEnterTest(this.edit, this.edit.find('h1').contents().get(0), 0, true, false, '#ref-heading-start-shift-enter');
		});

		test('Double Shift Enter at start', function() {
			doEnterTest(this.edit, this.edit.find('h1').contents().get(0), 0, true, true, '#ref-heading-start-shift-dblenter');
		});

		test('Shift Enter in middle', function() {
			doEnterTest(this.edit, this.edit.find('h1').contents().get(0), 3, true, false, '#ref-heading-mid-shift-enter');
		});

		test('Double Shift Enter in middle', function() {
			doEnterTest(this.edit, this.edit.find('h1').contents().get(0), 3, true, true, '#ref-heading-mid-shift-dblenter');
		});

		test('Shift Enter in bold', function() {
			doEnterTest(this.edit, this.edit.find('b').contents().get(0), 2, true, false, '#ref-heading-bold-shift-enter');
		});

		test('Double Shift Enter in bold', function() {
			doEnterTest(this.edit, this.edit.find('b').contents().get(0), 2, true, true, '#ref-heading-bold-shift-dblenter');
		});

		test('Shift Enter at end', function() {
			doEnterTest(this.edit, this.edit.find('h1').contents().last().get(0), 8, true, false, '#ref-heading-end-shift-enter');
		});

		test('Double Shift Enter at end', function() {
			doEnterTest(this.edit, this.edit.find('h1').contents().last().get(0), 8, true, true, '#ref-heading-end-shift-dblenter');
		});

		module('Paragraph Enter Handling', {
			setup: function() {
				// get the editable area and the reference
				this.edit = aQuery('#edit');
				this.ref = aQuery('#ref-paragraph');
				// fill the editable area with the reference
				this.edit.html(this.ref.html());

				// aloha'fy the editable
				this.edit.aloha();
			},
			teardown: function() {
				// de-aloha'fy the editable
				this.edit.mahalo();
			}
		});

		test('Enter at start', function() {
			doEnterTest(this.edit, this.edit.find('p').contents().get(0), 0, false, false, '#ref-paragraph-start-enter');
		});

		test('Double Enter at start', function() {
			doEnterTest(this.edit, this.edit.find('p').contents().get(0), 0, false, true, '#ref-paragraph-start-dblenter');
		});

		test('Enter in middle', function() {
			doEnterTest(this.edit, this.edit.find('p').contents().get(2), 3, false, false, '#ref-paragraph-mid-enter');
		});

		test('Double Enter in middle', function() {
			doEnterTest(this.edit, this.edit.find('p').contents().get(2), 3, false, true, '#ref-paragraph-mid-dblenter');
		});

		test('Enter at start of italic', function() {
			doEnterTest(this.edit, this.edit.find('i').contents().get(0), 0, false, false, '#ref-paragraph-startitalic-enter');
		});

		test('Double Enter at start of italic', function() {
			doEnterTest(this.edit, this.edit.find('i').contents().get(0), 0, false, true, '#ref-paragraph-startitalic-dblenter');
		});

		test('Enter in italic', function() {
			doEnterTest(this.edit, this.edit.find('i').contents().get(0), 3, false, false, '#ref-paragraph-miditalic-enter');
		});

		test('Double Enter in italic', function() {
			doEnterTest(this.edit, this.edit.find('i').contents().get(0), 3, false, true, '#ref-paragraph-miditalic-dblenter');
		});

		test('Enter at end of italic', function() {
			doEnterTest(this.edit, this.edit.find('i').contents().get(0), 6, false, false, '#ref-paragraph-enditalic-enter');
		});

		test('Double Enter at end of italic', function() {
			doEnterTest(this.edit, this.edit.find('i').contents().get(0), 6, false, true, '#ref-paragraph-enditalic-dblenter');
		});

		test('Enter at end', function() {
			doEnterTest(this.edit, this.edit.find('p').contents().get(2), 20, false, false, '#ref-paragraph-end-enter');
		});

		test('Double Enter at end', function() {
			doEnterTest(this.edit, this.edit.find('p').contents().get(2), 20, false, true, '#ref-paragraph-end-dblenter');
		});

		module('Paragraph Shift Enter Handling', {
			setup: function() {
				// get the editable area and the reference
				this.edit = aQuery('#edit');
				this.ref = aQuery('#ref-paragraph');
				// fill the editable area with the reference
				this.edit.html(this.ref.html());

				// aloha'fy the editable
				this.edit.aloha();
			},
			teardown: function() {
				// de-aloha'fy the editable
				this.edit.mahalo();
			}
		});

		test('Shift Enter at start', function() {
			doEnterTest(this.edit, this.edit.find('p').contents().get(0), 0, true, false, '#ref-paragraph-start-shift-enter');
		});

		test('Double Shift Enter at start', function() {
			doEnterTest(this.edit, this.edit.find('p').contents().get(0), 0, true, true, '#ref-paragraph-start-shift-dblenter');
		});

		test('Shift Enter in middle', function() {
			doEnterTest(this.edit, this.edit.find('p').contents().get(2), 3, true, false, '#ref-paragraph-mid-shift-enter');
		});

		test('Double Shift Enter in middle', function() {
			doEnterTest(this.edit, this.edit.find('p').contents().get(2), 3, true, true, '#ref-paragraph-mid-shift-dblenter');
		});

		test('Shift Enter at start of italic', function() {
			doEnterTest(this.edit, this.edit.find('i').contents().get(0), 0, true, false, '#ref-paragraph-startitalic-shift-enter');
		});

		test('Double Shift Enter at start of italic', function() {
			doEnterTest(this.edit, this.edit.find('i').contents().get(0), 0, true, true, '#ref-paragraph-startitalic-shift-dblenter');
		});

		test('Shift Enter in italic', function() {
			doEnterTest(this.edit, this.edit.find('i').contents().get(0), 3, true, false, '#ref-paragraph-miditalic-shift-enter');
		});

		test('Shift Enter at end of italic', function() {
			doEnterTest(this.edit, this.edit.find('i').contents().get(0), 6, true, false, '#ref-paragraph-enditalic-shift-enter');
		});

		test('Double Shift Enter at end of italic', function() {
			doEnterTest(this.edit, this.edit.find('i').contents().get(0), 6, true, true, '#ref-paragraph-enditalic-shift-dblenter');
		});

		test('Double Shift Enter in italic', function() {
			doEnterTest(this.edit, this.edit.find('i').contents().get(0), 3, true, true, '#ref-paragraph-miditalic-shift-dblenter');
		});

		test('Shift Enter at end', function() {
			doEnterTest(this.edit, this.edit.find('p').contents().get(2), 20, true, false, '#ref-paragraph-end-shift-enter');
		});

		test('Double Shift Enter at end', function() {
			doEnterTest(this.edit, this.edit.find('p').contents().get(2), 20, true, true, '#ref-paragraph-end-shift-dblenter');
		});

		module('List Enter Handling', {
			setup: function() {
				// get the editable area and the reference
				this.edit = aQuery('#edit');
				this.ref = aQuery('#ref-list');
				// fill the editable area with the reference
				this.edit.html(this.ref.html());

				// aloha'fy the editable
				this.edit.aloha();
			},
			teardown: function() {
				// de-aloha'fy the editable
				this.edit.mahalo();
			}
		});

		test('Enter at first start', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(0).contents().get(0), 0, false, false, '#ref-list-firststart-enter');
		});

		test('Double Enter at first start', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(0).contents().get(0), 0, false, true, '#ref-list-firststart-dblenter');
		});

		test('Enter at first middle', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(0).contents().get(0), 2, false, false, '#ref-list-firstmid-enter');
		});

		test('Double Enter at first middle', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(0).contents().get(0), 2, false, true, '#ref-list-firstmid-dblenter');
		});

		test('Enter at first end', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(0).contents().get(0), 5, false, false, '#ref-list-firstend-enter');
		});

		test('Double Enter at first end', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(0).contents().get(0), 5, false, true, '#ref-list-firstend-dblenter');
		});

		test('Enter at second start', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(1).contents().get(0), 0, false, false, '#ref-list-secondstart-enter');
		});

		test('Double Enter at second start', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(1).contents().get(0), 0, false, true, '#ref-list-secondstart-dblenter');
		});

		test('Enter at second middle', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(1).contents().get(0), 3, false, false, '#ref-list-secondmid-enter');
		});

		test('Double Enter at second middle', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(1).contents().get(0), 3, false, true, '#ref-list-secondmid-dblenter');
		});

		test('Enter at second end', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(1).contents().get(0), 6, false, false, '#ref-list-secondend-enter');
		});

		test('Double Enter at second end', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(1).contents().get(0), 6, false, true, '#ref-list-secondend-dblenter');
		});

		test('Enter at last start', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(2).contents().get(0), 0, false, false, '#ref-list-laststart-enter');
		});

		test('Double Enter at last start', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(2).contents().get(0), 0, false, true, '#ref-list-laststart-dblenter');
		});

		test('Enter at last middle', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(2).contents().get(0), 2, false, false, '#ref-list-lastmid-enter');
		});

		test('Double Enter at last middle', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(2).contents().get(0), 2, false, true, '#ref-list-lastmid-dblenter');
		});

		test('Enter at last end', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(2).contents().get(0), 5, false, false, '#ref-list-lastend-enter');
		});

		test('Double Enter at last end', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(2).contents().get(0), 5, false, true, '#ref-list-lastend-dblenter');
		});

		module('List Shift Enter Handling', {
			setup: function() {
				// get the editable area and the reference
				this.edit = aQuery('#edit');
				this.ref = aQuery('#ref-list');
				// fill the editable area with the reference
				this.edit.html(this.ref.html());

				// aloha'fy the editable
				this.edit.aloha();
			},
			teardown: function() {
				// de-aloha'fy the editable
				this.edit.mahalo();
			}
		});

		test('Shift Enter at first start', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(0).contents().get(0), 0, true, false, '#ref-list-firststart-shift-enter');
		});

		test('Double Shift Enter at first start', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(0).contents().get(0), 0, true, true, '#ref-list-firststart-shift-dblenter');
		});

		test('Shift Enter at first middle', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(0).contents().get(0), 2, true, false, '#ref-list-firstmid-shift-enter');
		});

		test('Double Shift Enter at first middle', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(0).contents().get(0), 2, true, true, '#ref-list-firstmid-shift-dblenter');
		});

		test('Shift Enter at first end', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(0).contents().get(0), 5, true, false, '#ref-list-firstend-shift-enter');
		});

		test('Double Shift Enter at first end', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(0).contents().get(0), 5, true, true, '#ref-list-firstend-shift-dblenter');
		});

		test('Shift Enter at second start', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(1).contents().get(0), 0, true, false, '#ref-list-secondstart-shift-enter');
		});

		test('Double Shift Enter at second start', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(1).contents().get(0), 0, true, true, '#ref-list-secondstart-shift-dblenter');
		});

		test('Shift Enter at second middle', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(1).contents().get(0), 3, true, false, '#ref-list-secondmid-shift-enter');
		});

		test('Double Shift Enter at second middle', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(1).contents().get(0), 3, true, true, '#ref-list-secondmid-shift-dblenter');
		});

		test('Shift Enter at second end', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(1).contents().get(0), 6, true, false, '#ref-list-secondend-shift-enter');
		});

		test('Double Shift Enter at second end', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(1).contents().get(0), 6, true, true, '#ref-list-secondend-shift-dblenter');
		});

		test('Shift Enter at last start', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(2).contents().get(0), 0, true, false, '#ref-list-laststart-shift-enter');
		});

		test('Double Shift Enter at last start', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(2).contents().get(0), 0, true, true, '#ref-list-laststart-shift-dblenter');
		});

		test('Shift Enter at last middle', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(2).contents().get(0), 2, true, false, '#ref-list-lastmid-shift-enter');
		});

		test('Double Shift Enter at last middle', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(2).contents().get(0), 2, true, true, '#ref-list-lastmid-shift-dblenter');
		});

		test('Shift Enter at last end', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(2).contents().get(0), 5, true, false, '#ref-list-lastend-shift-enter');
		});

		test('Double Shift Enter at last end', function() {
			doEnterTest(this.edit, this.edit.find('li').eq(2).contents().get(0), 5, true, true, '#ref-list-lastend-shift-dblenter');
		});
	});

    var url = window.location.search;
	url = decodeURIComponent( url.slice( url.indexOf("swarmURL=") + 9 ) );
	if ( url && url.indexOf("http") === 0 ) {
		require(["http://testswarm.aloha-editor.org/js/inject.js?" + (new Date).getTime()], function() {});
	}
});