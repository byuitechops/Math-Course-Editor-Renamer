var Nightmare = require('nightmare');
var nightmare = Nightmare({
	alwaysOnTop: false,
	show: true
})
var domain = "pathway" // 237861
var ous = [30994]; //[30994, 30995, 30996, 30997, 30998, 30999, 31000, 31001, 31028, 31044, 31045, 31046, 31047, 31049, 31059, 31060, 31067, 31091, 31092, 31093, 31094, 31095, 31096, 31097, 31098, 31099, 31100, 31101, 31102, 31103, 31104, 31105, 31106, 31107, 31108, 31109, 31110, 31111, 31112, 31113, 31114, 31115, 31116, 31117, 31121, 31139, 31147, 31148, 31149, 31150, 31151, 31152, 31153, 31154, 31155, 31156, 31157, 31158, 31176, 31201, 31202, 31203, 31204, 31205, 31206, 31207, 31208]
var blacklist = ["Exercise 1.2 Part C Tutorial Videos.html", "Exercise 4.1 Part C Tutorial Video534419.html"]
// take off the note and link to download
var bluelist = ["Equations and Slopes.html", "Exercise 403 Part A Tutorial Video.html", "L01.04 Flash Cards.html", "L02 Decimal Point and Comma.html", "L02 Exercise 1.2 Part A Tutorial Video.html", "L02 Rounding & Estimation.html", "L03 Developmental Processes Video.html", "L03 Exercise 1.3 Part A Tutorial Videos.html", "L03.01 Decimals & Percents.html", "L04 Exercise 1.4 Part A Tutorial Videos.html", "L04.01 Fractions.html", "L04.02 Unit Conversion.html", "L04.07 Visual Charts.html", "L05 Exercise 2.1 Part C Tutorial Video.html", "L05.02 Exponents & Calculator Usage.html", "L05.03 Exercise 1.4 Part A Tutorial Video.html", "L06 Distribute and Simplify Video.html", "L06 Exercise 2.2 Part A Tutorial Video.html", "L06 Exercise 2.2 Part C Tutorial Video.html", "L06 Exercise 2.2 Part C Tutorial Video(1).html", "L06.01 Variables & Formulas.html", "L07 Exercise 2.3 Part A Tutorial Video.html", "L07 Exercise 2.3 Part C Tutorial Video.html", "L07 Exercise 3.1 Part A Tutorial Video.html", "L07.02 Formulas and Spreadsheet Usage.html", "L08.02 Linear Equations & Applications.html", "L08.03 Linear Equations with Variables on Both Sides of the Equation.html", "L09.01 More Linear Equations & Percents.html", "L09.02 Linear Equations with Fractions.html", "L10.02 Exponents Revisited.html", "L10.03 Savings and Loan Formulas.html", "L11.02 Introduction to Charts and Graphs.html", "L11.03 Charts and Graphs in Excel.html", "L12.01 Lines & Shapes.html", "L12.02 Exercise 4.2 Part A Tutorial Video.html", "L13.01 Equations and Slopes.html", "L13.02 Writing Equations.html", "L13.03 Exercise 4.3 Part A Tutorial Video.html", "L13.07 Exercise 4.3 Part C Tutorial Video.html", "Savings   Loan Formulas.html", "Slope Video.html", "Welcome to MATH 100G.html"]
// change the ref to the instructions
var orangelist = ["Gathering Instructions.html", "Gathering Instructions191213.html", "Gathering Instructions244912.html", "Gathering Instructions411723.html", "Gathering Instructions498557.html", "Gathering Instructions537922.html", "Gathering Instructions549690.html", "Gathering Instructions550213.html", "Gathering Instructions550717.html", "Gathering Instructions648302.html", "Gathering Instructions773307.html", "Gathering Instructions810910.html", "Gathering Instructions900783.html", "Gathering Instructions929935.html", "L01.06 Gathering Instructions.html", "L02 Gathering Instructions.html", "L04.05 Gathering Preparation.html", "L05.05 Gathering Instructions.html", "L06.04 Gathering Instructions.html", "L07.05 Gathering Instructions.html", "L08.06 Gathering Instructions.html", "L09.05 Gathering Instructions.html", "L10.06 Gathering Instructions.html", "L11.05 Gathering Instruction.html", "L12.04 Gathering Instructions.html", "L13.05 Gathering Instructions.html"]
var editlist = bluelist.concat(orangelist)

function renameFile(file) {
	function renamer(str) {
		return str.replace(/s? \(New\)/, (match, index, string) => {
			return string.match("1.4 Part A") ? "s" : ""
		}).replace("Turtorial", "Tutorial")
	}
	// click the rename option
	$('span:contains("' + file + '")').parent().parent().click().find('span:contains("Rename")').click()
	// run the renamer on the input val, then click save
	$('input[type=text]').val(function (i, str) {
		return renamer(str)
	}).next().next().click()
}

function removeFile(file) {
	// click the rename option
	$('span:contains("' + file + '")').parent().parent().click().find('span:contains("Delete")').click()
	$('a:contains("Yes")').click() // Click yes on the pop up "are you sure?" thing
}

function editFile(file, done) {
	// will call the callback once the passed function rings true
	function waitTill(booleanFunction, callback,repeatAction) {
		var handle = setInterval(function () {
			if (booleanFunction()) {
				clearInterval(handle);
				callback()
			} else if(repeatAction)
				repeatAction()
		}, 500)
	}
	// click the edit file option
	$('span:contains(' + file + ')').parent().parent().click().find('span:contains("Edit File")').click()
	// Wait till the iframe in the iframe loads :|
	waitTill(() => $('iframe').contents().find('iframe').length, function () {
		var frame = $('iframe').contents().find('iframe').contents()
		// remove the paragraphs that contain "To download this video" or "Note:"
		frame.find('p:contains(To download this video)').remove()
		frame.find('p:contains(Note:),p:contains(NOTE:),p:contains(note:)').remove()
		// click the code editor
		$('iframe').contents().find('a[title="HTML Source Editor"] img').click()
		// wait for it to load
		waitTill(() => $('iframe.d2l-dialog-frame').contents().find('textarea').val(), function () {
			// edit the textarea val with some regex replace
			$('iframe.d2l-dialog-frame').contents().find('textarea').val((i, str) => str.replace(/<a.*?(>.*lead student and group participant.*a>)/, '<a target="_blank" href="https://content.byui.edu/integ/gen/c529b6cc-a70b-4a94-9872-01f35548d87d/0/Pathway%20MATH%20100%20Gathering%20Meeting%20Responsibilities.pdf"$1'))
			// click save
			$('iframe.d2l-dialog-frame').contents().find('a.vui-button-primary')[0].click()
			// wait for it to save before clicking the next save
			waitTill(() => $('iframe.d2l-dialog-frame').length == 0,function(){
				$('a.vui-button-primary').click()
				done(null)
			},() => $('iframe.d2l-dialog-frame').contents().find('a.vui-button-primary')[0].click())
		})
	})
}



function makeLists(list) {
	function renamer(str) {
		return str.replace(/s? \(New\)/, (match, index, string) => {
			return string.match("1.4 Part A") ? "s" : ""
		}).replace("Turtorial", "Tutorial")
	}
	var remove = blacklist.slice(0) // make a copy of the blacklist
	var rename = list.filter(fileName => {
		if (fileName.match(/s? \(New\)/)) {
			// push the file to remove if we are going to try to rename our file to it
			remove.push(renamer(fileName))
			return true
		}
		return false
	})
	return {
		rename: rename,
		remove: remove.filter(fileName => list.indexOf(fileName) != -1), // only remove files that actually exist
		edit: editlist.slice(0).filter(fileName => list.indexOf(fileName) != -1)
	}
}

function goThroughCourse(nightmare, index) {
	console.log("Currently working on", ous[index])
	nightmare
		.goto('https://'+domain+'.brightspace.com/d2l/lp/manageFiles/main.d2l?ou=' + ous[index])
		// Go to the Course Files folder
		.evaluate(function () {
			$('span:contains("Course Files")').click()
		})
		//		.wait(() => document.querySelectorAll('li:nth-child(4) span strong').length > 0 ) // wait for the AJAX thingy
		.wait(1000) // wait for the AJAX thingy
		.evaluate(function(done) {
			function meep(i){
				setTimeout(() => {
					console.log(i)
					document.querySelector('tr.yui-dt-even:last-child , tr.yui-dt-odd:last-child').scrollIntoView()
					if(i)
						meep(i-1)
					else
						done()
				},500)
			}
			meep(5)
		})
		.evaluate(function () {
			// get list of all the html files that there are
			return $("span:contains('.html')").map(function () {
				return $(this).text()
			}).get()
		})
		.then(files => {
			files = makeLists(files)
			console.log(files)
			// chaining nightmare evaluates together, cross your finger it will work
//			nightmare = files.remove.reduce((knight, file) => knight.evaluate(removeFile, file).wait(500), nightmare)
//			nightmare = files.rename.reduce((knight, file) => knight.evaluate(renameFile, file).wait(500), nightmare)
			nightmare = files.edit.reduce((knight, file) => knight.evaluate(editFile, file).wait(500), nightmare)
			return nightmare
		})
		.then(() => {
			// then go through the next course if there is one
			if (index < ous.length - 1)
				goThroughCourse(nightmare, index + 1)
			else
				return nightmare.end()
		})
		.catch(console.error)
}



nightmare
	.goto('https://'+domain+'.brightspace.com/d2l/login?noredirect=true')
	.wait('#password')
	.insert('#userName', logInData.username)
	.insert('#password', logInData.password)
	.click('#formId div a')
	.wait(() => window.location.pathname == "/d2l/home")
	.then(() => {
		console.log("I'm in")
		goThroughCourse(nightmare, 0)
	})
	.catch(console.error)
