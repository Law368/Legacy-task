$(document).ready(function(){
    addStudentsToTheList();
    $('#btnSubmit').on('click',function(){

        if (hasEmptyRequiredInput()) {

            $('#alert').modal('show');
            return false;
        }
        Get_scores();
        $('#finalScore').modal('show');
        return false;
    });
});


function inputsInformation(inputs) {
    var text = '';
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var element = $('#' + input.id);

        if (element && _.isEmpty(element.val())) {
            $('#'+input.divId).addClass('has-error');
            text += input.text + '';
        }
        else {
            $('#' + input.divId).removeClass('has-error');
        }
    }
    return text;
}

var students = [
    {
        studentClass: 1,
        studentNumber: 1,
        studentName: 'John'
    },
    {
        studentClass: 2,
        studentNumber: 2,
        studentName: 'Natalia'
    },
    {
        studentClass: 3,
        studentNumber: 3,
        studentName: 'Alexander'
    },
    {
        studentClass: 4,
        studentNumber: 4,
        studentName: 'Josef'
    }
]

function addStudentsToTheList() {
    select = document.querySelector('#studentList');
    for (var i = 0; i < students.length; i++) {
        var option = document.createElement('option');
        option.value = students[i].studentNumber;
        option.dataset.class = students[i].studentClass;
        option.innerHTML = students[i].studentName;
        select.appendChild(option);
    }
}

function hasEmptyRequiredInput(){
    var requiredInputs = [
        {
            id: 'studentList',
            text: 'Some random text',
            divId: 'student'
        }
    ];

    var text = inputsInformation(requiredInputs);
    if(text !== ''){

        return true;
    }
        return false;
}

function Get_scores() {

    var value = fullInTopics() + choiceTopics() + multipleChoiceTopics() + trueOrFalseTopics() + shortAnswerTopics();
    $("#scores").text(value);
    $("#modalScores").text(value);
    $('#divScores').addClass('text-danger');

    var markResult = function () {
        if (value >= 90) {
            mark = 'A';
        } else if (value >= 70) {
            mark = 'B';
        } else if (value >= 50) {
            mark = 'C';
        } else if (value >= 30) {
            mark = 'D'
        } else if (value >= 0) {
            mark = 'F'
        } 
        return mark;
    }

    $("#mark").text(markResult);

}

function fullInTopics() {
    var fullInSubject1 = new Subject('fullInSubject', ['Unified Modeling Language'], 1, 5); //
    var fullInSubject2 = new Subject('fullInSubject', ['inheritance', 'polymorphism', 'encapsulation'], 3, 5); // 'inheritance', 'polymorphism', 'encapsulation'

    var value1_1_1 = $('#gap1').val();

    if (value1_1_1 == fullInSubject1.answer[0]) {
        fullInSubject1.scores += fullInSubject1.scorePerSubject;
    }

    var value1_2 = [];
    value1_2.push($('#gap2_1').val());
    value1_2.push($('#gap2_2').val());
    value1_2.push($('#gap2_3').val());

    for (var i = 0; i < fullInSubject2.answer.length; i++) {
        for (var j = 0; j < value1_2.length; j++) {
            if (fullInSubject2.answer[i] == value1_2[j]) {
                fullInSubject2.scores += fullInSubject2.scorePerSubject;
                break;
            }
        }
    }
    return fullInSubject1.scores + fullInSubject2.scores;
}

function choiceTopics() {
    var choiceSubject = new Subject('choiceSubject', ['B', 'A'], 2, 10);

    var choiceSubject1 = new ChoiceSubject('radio_ans_1');
    var value1 = choiceSubject1.calculation();
    var choiceSubject2 = new ChoiceSubject('radio_ans_2');
    var value2 = choiceSubject2.calculation();
    var value = [value1, value2];

    for (var i = 0; i < value.length; i++) {
        if (value[i] == choiceSubject.answer[i]) {
            choiceSubject.scores += choiceSubject.scorePerSubject;
        }
    }
    return choiceSubject.scores;
}

function multipleChoiceTopics() {
    var multipleChoiceSubject = new Subject('multipleChoiceSubject',
        [
            ['A', 'B', 'D'],
            ['A', 'B', 'C']
        ], 2, 10);

    var multipleChoiceSubject1 = new MultipleChoiceSubject('check_ans_1');
    var value1 = multipleChoiceSubject1.calculation();
    var answer1 = multipleChoiceSubject.answer[0];
    if (answer1.length == value1.length) {
        var diffA = _.difference(value1, answer1);
        if (_.isEmpty(diffA)) {
            multipleChoiceSubject.scores += multipleChoiceSubject.scorePerSubject;
        }
    }

    var multipleChoiceSubject2 = new MultipleChoiceSubject('check_ans_2');
    var value2 = multipleChoiceSubject2.calculation();
    var answer2 = multipleChoiceSubject.answer[1];
    if (answer2.length == value2.length) {
        var diffB = _.difference(value2, answer2);
        if (_.isEmpty(diffB)) {
            multipleChoiceSubject.scores += multipleChoiceSubject.scorePerSubject;
        }
    }
    return multipleChoiceSubject.scores;
}

function trueOrFalseTopics() {
    var trueOrFalseSubject = new Subject('trueOrFalseSubject', ['no', 'yes', 'yes'], 3, 10);
    var trueOrFalseSubject1 = new ChoiceSubject('ans_1');
    var value1 = trueOrFalseSubject1.calculation();
    var trueOrFalseSubject2 = new ChoiceSubject('ans_2');
    var value2 = trueOrFalseSubject2.calculation();
    var trueOrFalseSubject3 = new ChoiceSubject('ans_3');
    var value3 = trueOrFalseSubject3.calculation();
    var value = [value1, value2, value3];

    for (var i = 0; i < value.length; i++) {
        if (value[i] == trueOrFalseSubject.answer[i]) {
            trueOrFalseSubject.scores += trueOrFalseSubject.scorePerSubject;
        }
    }
    return trueOrFalseSubject.scores;
}

function shortAnswerTopics() {
    var shortAnswerSubject = new Subject('shortAnswerSubject',
        ['A model is a simplification and abstraction of the real world, and a model is a form of expression for the system, process, thing or concept under study. It can be a physical entity; it can be some kind of graphic; or it can be a mathematical expression.'],
        1, 20);
    var value5 = $('#short5').val();

    if (value5 == shortAnswerSubject.answer[0]) {
        shortAnswerSubject.scores = shortAnswerSubject.scorePerSubject;
    }
    return shortAnswerSubject.scores;
}
