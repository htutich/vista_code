$(function() {

    var dataList = []
    var currentType = 'present';
    var activeItem = {
        'type': 'none',
        'id': -1
    };

    var grantedTypes = ['present', 'quitting'];

    var typeUrl = {
        'present':'/data/presentList.json',
        'quitting':'/data/quittingList.json'
    }

    var theadType = {
        'present': `<tr> <td>№ ИБ</td> <td>ФИО</td> <td>Палата</td> </tr>`,
        'quitting': `<tr> <td>№ ИБ</td> <td>ФИО</td> <td>Причина выбытия</td> </tr>`
    }

    function initList(type = 'present') {

        $.ajax({
            url: typeUrl[type],
            type: "get",
            async: true,
            success:function(data) {
                $(`.routebtn[data-route="${type}"] span`).html(data.length);
                dataList[type] = data;
                let activeType = $('.routebtn.active').data('route');

                if (activeType == currentType) {
                    showList(activeType);
                }
            }
        });

    }

    function showList(type = 'present') {

        if (!grantedTypes.includes(type)) return false;

        currentType = type;

        $('.datalist thead').html(theadType[type]);
        $('.datalist tbody').html('');
        
        for (let key in dataList[type]) {
            if (Object.hasOwnProperty.call(dataList[type], key)) {
                let elem = dataList[type][key];

                let therdval = {
                    'present': elem.bedNumber,
                    'quitting': elem.cause
                }

                let tpl = `
                <tr data-itemid="${key}">
                    <td>${elem.historyNumber}</td>
                    <td>${elem.lastName} ${elem.firstName} ${elem.patrName}</td>
                    <td>${therdval[type]}</td>
                </tr>
                `;
                $('.datalist tbody').append(tpl);
            }
        }

        if (activeItem['type'] == type) {
            $(`.datalist tbody tr[data-itemid="${activeItem['id']}"]`).addClass('selected');
        }
    }

    function showItem(id = 0, type = 'present') {
        currentTypeId = id;

        activeItem = {
            'type': type,
            'id': id
        };

        let fio = `${dataList[type][id].lastName} ${dataList[type][id].firstName} ${dataList[type][id].patrName}`;
        let age = parseInt((new Date().getTime() - new Date(dataList[type][id].birthDate)) / (24 * 3600 * 365.25 * 1000));
        let diagnosis = dataList[type][id].diagnosis;
        
        $('input[name="fio"]').val(fio)
        $('input[name="age"]').val(age)
        $('input[name="diagnosis"]').val(diagnosis)
    }

    $('.datalist tbody').on('click', 'tr', function(){
        let item = $(this).data('itemid');

        $('.datalist tbody tr').removeClass('selected');
        $(this).addClass('selected');

        showItem(item, currentType);
    })

    $(`.routebtn[data-route]`).on('click', function(){
        let route = $(this).data('route');
        if (route != currentType) {
            showList(route);
            $(`.routebtn[data-route]`).removeClass('active');
            $(`.routebtn[data-route="${route}"]`).addClass('active');
        }
    })

    for (let index = 0; index < grantedTypes.length; index++) {
        let type = grantedTypes[index];
        initList(type);
    }

});
