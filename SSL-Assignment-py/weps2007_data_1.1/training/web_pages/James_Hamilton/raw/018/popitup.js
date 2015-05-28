        var newwindow;
        function popitup(url, name, specs) {
                newwindow=window.open(url, name, specs);
                if (newwindow.opener == null) {
                        newwindow.opener = self;
                }
                return false;
        }

