class Api {
    content;
    ajax;
    type;
    location;
    successFunction;
    loadingFunction;
    failureFunction;
    constructor(httpType, url, success, loading, failure) {
        this.ajax = new XMLHttpRequest();
        this.type = httpType;
        this.location = url;
        this.successFunction = success;
        this.loadingFunction = loading;
        this.failureFunction = failure;
    }

    get() {
        let holder = this;
        this.ajax.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                holder.successFunction();
            } else if (this.readyState != 4) {
                holder.loadingFunction();
            } else {
                holder.failureFunction();
            }
        }
        this.ajax.open(this.type, this.location, true);
        this.ajax.send();
    }
}