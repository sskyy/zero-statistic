# zero-statistics #

This module help you log request or bus event.

## Usage ##

1. Add dependency to your module package.json file like:

```
{
	"name" : "YOUR_MODULE_NAME",
	"zero" : {
		"dependencies" : {
			"statistics" : "^0.0.1"
		}
	}
}
```

2. declare `statistics` in your module :

```
module.exports = {
	statistics : {
		log : {
			"GET /post/*" : "daily",
			"rest.fire.after" : {
				strategy : "feed",
				argv : ["post"]
			}
		}
	}
}
```

3. Simply visit `/statistic?type=GET /post/*-daily` to get results.
