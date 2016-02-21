{
	"metadata": {
		"version": 4.4,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "515254B9-8D31-4DCE-B77D-A5C278316282",
			"type": "PlaneGeometry",
			"width": 2,
			"height": 2
		},
		{
			"uuid": "9CF4B272-F790-4EC6-84A8-0F2727C0622F",
			"type": "PlaneGeometry",
			"width": 2,
			"height": 2
		},
		{
			"uuid": "DE64E0FE-E826-4DC4-90ED-4171CEEC4A52",
			"type": "BoxGeometry",
			"width": 1,
			"height": 1,
			"depth": 1
		}],
	"materials": [
		{
			"uuid": "57E8E84F-5614-490E-AC3A-E9514D6ECC82",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"emissive": 0
		},
		{
			"uuid": "B1A2E415-E021-4B4E-AA14-4743D37C7669",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"emissive": 0
		},
		{
			"uuid": "7F9B5006-3098-4295-9FDC-84622AA1EF84",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"emissive": 0
		}],
	"object": {
		"uuid": "E622F84E-14BC-4E59-A925-CD4F35F59FC9",
		"type": "Scene",
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "E0ED6050-963B-4311-8FCB-79C9634153AA",
				"type": "Group",
				"name": "Group 5",
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
				"children": [
					{
						"uuid": "999A8681-2054-4D53-9315-22F0D93F046E",
						"type": "Mesh",
						"name": "Plane 3",
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,8,0,1],
						"geometry": "515254B9-8D31-4DCE-B77D-A5C278316282",
						"material": "57E8E84F-5614-490E-AC3A-E9514D6ECC82"
					},
					{
						"uuid": "8D81BD0D-6BDD-4644-AD91-90D9FED839AE",
						"type": "Mesh",
						"name": "Plane 4",
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,15,0,1],
						"geometry": "9CF4B272-F790-4EC6-84A8-0F2727C0622F",
						"material": "B1A2E415-E021-4B4E-AA14-4743D37C7669"
					}]
			},
			{
				"uuid": "28EF6E0E-92B9-42DA-A142-A75833F8BB82",
				"type": "Group",
				"name": "Group 6",
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
				"children": [
					{
						"uuid": "C20CDF45-49C9-4F27-A504-5657AC407C69",
						"type": "Mesh",
						"name": "Box 2",
						"matrix": [10,0,0,0,0,20,0,0,0,0,1,0,0,10,0,1],
						"geometry": "DE64E0FE-E826-4DC4-90ED-4171CEEC4A52",
						"material": "7F9B5006-3098-4295-9FDC-84622AA1EF84"
					},
					{
						"uuid": "18A5F808-9595-445E-A187-E85562A6E991",
						"type": "AmbientLight",
						"name": "AmbientLight 1",
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,8.853676795959473,7.764400005340576,1],
						"color": 2236962,
						"intensity": 1.2
					}]
			}]
	}
}