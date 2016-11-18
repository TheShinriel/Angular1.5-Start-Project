export default class ElipsisDirective {
    constructor() {
        this.restrict = 'A';
    }

    // Directive link function
    link(scope, element, attrs) {
        var watcher = scope.$watch(function() {
            return element.context.innerHTML;
        }, function(newValue, oldValue) {
            if (parseInt(element.context.offsetWidth) > parseInt(element.context.parentElement.offsetWidth)) {
                let titleText = element.context.innerHTML.trim();
                element.context.setAttribute('title', titleText);
                element.context.style.display = "block";
            }
            watcher(); // Remove the watcher after the job is done :D
        });
    }
}
