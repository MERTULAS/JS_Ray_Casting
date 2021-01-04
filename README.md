# How It Works Ray Casting?

![image](https://user-images.githubusercontent.com/67822910/103563055-3175d480-4ecd-11eb-88ae-5a896a5bd248.png)

# 1-) Player field of view calculation based on angular movement

![image](https://user-images.githubusercontent.com/67822910/103559424-2750d780-4ec7-11eb-99b3-38c75d1f9e6a.png)

The calculation shown in the figure is used in the field of view movement of the angularly oriented character. 
Every vector within the field of view is updated this way.

# 2-) Line–line intersection

![image](https://user-images.githubusercontent.com/67822910/103559846-ddb4bc80-4ec7-11eb-9276-1454fb0f9b10.png)

When an obstacle arises within this field of view, the multiplier vectors end at the point of cast.

![image](https://user-images.githubusercontent.com/67822910/103560430-cfb36b80-4ec8-11eb-9a8c-51a907915842.png)

![image](https://user-images.githubusercontent.com/67822910/103560483-e5289580-4ec8-11eb-978e-1426919f8913.png)

Note : Picture and information source: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection;

If 0 < t < 1 and u > 0, it is understood that the two specified lines intersect. 

The intersecting point is obtained by the formula (According to the narrative picture above):

```
castX: x2 + t * (x3 - x2)
castY: y2 + t * (y3 - y2)
```

```
rayCasting(wall, dx, dy){
        const x1 = wall.x1;
        const y1 = wall.y1;
        const x2 = wall.x2;
        const y2 = wall.y2;
        const x3 = this.x + this.width / 2;
        const y3 =  this.y + this.height / 2;
        const x4 = dx;
        const y4 = dy;
        let divider = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / divider;
        let u = -1 * ((x1 - x2) * (y1 - y3) - (y1 - y2)*(x1 - x3)) / divider;
        if(t > 0 && t < 1 && u > 0){
            const point = {
                x: x1 + t * (x2 - x1),
                y: y1 + t * (y2 - y1)
            };
        this.castingPoints.push(point);
        return point;
        }
    }
```
![image](https://user-images.githubusercontent.com/67822910/103561513-adbae880-4eca-11eb-84db-acfae07c8c8d.png)

![image](https://user-images.githubusercontent.com/67822910/103561543-bad7d780-4eca-11eb-8bd8-abf00405b95f.png)

# 3-) 3D Render

![image](https://user-images.githubusercontent.com/67822910/103562456-2c645580-4ecc-11eb-83c0-a0c0b1f62d75.png)

If the length of the vector is too long, it is understood that this point of impact is far away, and if the length of the vector is short, the point of impact is close. Since nearby objects will be large and distant objects will be small, a method can be followed as follows.

MaxHeight = 1000;
MinHeight = 0;

wallHeight = MaxHeight * ((MaxHeight - distance) / maxHeight);

Using this operation, the wall size takes a value between 0 and 1000 depending on the distance from the hit point. (0 - 1000 is optional.).

![image](https://user-images.githubusercontent.com/67822910/103563024-1efb9b00-4ecd-11eb-87fe-9c668db4307f.png);

![image](https://user-images.githubusercontent.com/67822910/103563055-3175d480-4ecd-11eb-88ae-5a896a5bd248.png)

![image](https://user-images.githubusercontent.com/67822910/103563107-3e92c380-4ecd-11eb-8d0c-cdd564656996.png)

![image](https://user-images.githubusercontent.com/67822910/103563149-4d797600-4ecd-11eb-8906-97fe821454f2.png)
