# uiflows-parser

[ui-spec-md](https://github.com/pxgrid/ui-spec-md)のUI Flowsのコードブロックをパースする部分を抜き出したもの。


## Usage

### want this

![uiflows-sample](https://cloud.githubusercontent.com/assets/755854/23638054/a9db850a-0322-11e7-830c-87fd661d0d8e.png)


### sample script

```javascript
const uiflowsParser = require( 'uiflows-parser' );

const uiflowsStr = `
[what the user sees]
what they do
==> what they see next

[what they see next]
what they do next
`;

uiflowsParser(uiflowsStr);
```


### the return (dot lang)

```dot
	digraph "" {

	graph [ rankdir = "LR" ];
	node [
		fontsize = "16"
		shape = "record"
		tooltip = ""
	];
	edge [];

	
		"node0" [
			
				tooltip = ""
			
			label = "
				
					<port0> what the user sees
					 | 
				
					<port1> what they do
					
				
			"
		];
	
		"node1" [
			
				tooltip = ""
			
			label = "
				
					<port0> what they see next
					 | 
				
					<port1> what they do next
					
				
			"
		];
	

	
		node0:port1 -> node1:port0;
	
	}
```

would be to good pass the return to [Viz.js](https://github.com/mdaines/viz.js/).


## Other examples

- [uiflows-convert-png](https://github.com/pxgrid/uiflows-convert-png)'s [./index.js](https://github.com/pxgrid/uiflows-convert-png/blob/master/index.js)
- [ui-spec-md](https://github.com/pxgrid/ui-spec-md)'s [./lib/UiflowsMDRenderer.js](https://github.com/pxgrid/ui-spec-md/blob/v0.2.x/lib/UiflowsMDRenderer.js)

