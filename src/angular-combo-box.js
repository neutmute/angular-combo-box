angular.module('ngComboBox', [])
    .directive('comboBox', function() {
        return {
            restrict: 'E',
            scope: {
                options: '=',
                comboModel: '=',
                otherLabel: '@?'
            },
            template: '<select ng-model="selected" ng-change="optionChanged(selected)">' +
                '    <option value="">--Select--</option>' +
                '    <option ng-repeat="option in options">{{option}}</option>' +
                '    <option value="other" ng-bind="otherLabel"></option>' +
                '</select>' +
                '<br />' +
                '<input type="text" ng-model="other" ng-change="optionChanged(selected)" ng-show="selected === \'other\'" />',
            compile: function(el, attrs) {
                if (!attrs.otherLabel) {
                    attrs.otherLabel = 'Other';
                }
            },
            controller: 'comboBoxController'
        };
    })
    .controller('comboBoxController', ['$scope', function($scope) {
        $scope.optionChanged = setComboModel;
        if ($scope.comboModel) {
            setInput($scope.comboModel);
        }

        function setInput(value) {
            if ($scope.options.indexOf(value) !== -1) {
                $scope.selected = value;
            } else {
                $scope.selected = 'other';
                $scope.other = value;
            }
        }

        function setComboModel(option) {
            if (option !== 'other') {
                $scope.other = '';
                $scope.comboModel = option;
            } else {
                $scope.comboModel = $scope.other;
            }
        }
    }]);
