// to Rename
$('span:contains("meep.html")').parent().parent().click().find('span:contains("Rename")').click()
$('input[type=text]').val((i, str) => str.replace(".html", ".lmth")).next().next().click()

// to Delete
$('span:contains("meep.html")').parent().parent().click().find('span:contains("Delete")').click()
$('a:contains("Yes")').click()


// function will call the call back once the function returns true

// To Edit
function waitTill(booleanFunction, callback) {
	var handle = setInterval(function () {
		if (booleanFunction()) {
			clearInterval(handle);
			callback()
		}
	}, 500)
}
$('span:contains("Gathering Instructions.html")').parent().parent().click().find('span:contains("Edit File")').click()
waitTill(() => $('iframe').contents().find('iframe').length, function () {
	var frame = $('iframe').contents().find('iframe').contents()
	frame.find('p:contains(To download this video)').remove()
	frame.find('p:contains(Note:),p:contains(NOTE:),p:contains(note:)').remove()
	$('iframe').contents().find('a[title="HTML Source Editor"] img').click()
	waitTill(() => $('iframe.d2l-dialog-frame').contents().find('textarea').val(), function () {
		$('iframe.d2l-dialog-frame').contents().find('textarea').val((i,str) => str.replace(/<a.*?(>.*lead student and group participant.*a>)/,'<a target="_blank" href="https://content.byui.edu/integ/gen/c529b6cc-a70b-4a94-9872-01f35548d87d/0/Pathway%20MATH%20100%20Gathering%20Meeting%20Responsibilities.pdf"$1'))
		$('iframe.d2l-dialog-frame').contents().find('a.vui-button-primary')[0].click()
		setTimeout(() => {
			$('a.vui-button-primary')
			done(null)
		}.click(),500)
	})
})

// To scroll till everything is loaded
while($('tr.yui-dt-even, tr.yui-dt-odd').length < 400){
	console.log($('tr.yui-dt-even, tr.yui-dt-odd').length)
	document.querySelector('tr.yui-dt-even:last-child , tr.yui-dt-odd:last-child').scrollIntoView()
}

function meep(i){
	setTimeout(() => {
		console.log(i)
		document.querySelector('tr.yui-dt-even:last-child , tr.yui-dt-odd:last-child').scrollIntoView()
		if(i)
			meep(i-1)
		else
			console.log('done')
	},500)
}
