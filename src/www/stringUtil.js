/* globals encodeURIComponent */

var urlPartsRegex = /(http[s]?:\/\/)([^:\/?#]*)([^\/?#]*)([^?#]*)([^#]*)/g;

var stringUtil = {
    escapeFragment: function (url) {
        /*
         * convert any hash params to escaped fragments as google would do
         *
         * RexEx positions:
         * 0: empty
         * 1: protocol including ://
         * 2: host
         * 3: port including :
         * 4: path
         * 5: query
         * 6: hash
         */
        var urlParts = stringUtil.splitUrl(url);

        var hash = urlParts[6];

        if (hash.indexOf('#!') === 0) {
            hash = hash.substring(2);

            var hasQuery = urlParts[5].length;

            if (hasQuery) {
                urlParts[5] += '&';
            } else {
                urlParts[5] = '?';
            }

            urlParts[5] += '_escaped_fragment_=' + encodeURIComponent(hash);

            url =
                urlParts[0] +
                urlParts[1] +
                urlParts[2] +
                urlParts[3] +
                urlParts[4] +
                urlParts[5];
        }

        return url;
    },

    splitUrl: function (url) {
        return url.split(urlPartsRegex);
    },

    toQueryMap: function (query) {
        var queryMap = [];

        query.replace(
            /([^?&=]+)=([^?&=]*)/g,
            function (original, key, value) {
                queryMap.push({
                    key: key,
                    value: value
                });
            }
        );

        return queryMap;
    }
};

module.exports = stringUtil;
