/**
 * Created by GSN on 2/19/2017.
 */
var Random = cc.Class.extend({

    ctor: function(seed){
        this._inext=0;
        this._inextp=0;
        this.MBIG = 0x7fffffff;
        this.MSEED = 0x9a4ec86;
        this.MZ = 0;
        this._seed=seed;
        this._seedArray=new Array(0x38);
        this.numRand=0;

        var num2 = 0x9a4ec86 - Math.abs(seed);
        this._seedArray[0x37] = num2;
        var num3 = 1;
        for (var i = 1; i < 0x37; i++)
        {
            var index = (0x15 * i) % 0x37;
            this._seedArray[index] = num3;
            num3 = num2 - num3;
            if (num3 < 0)
            {
                num3 += 0x7fffffff;
            }
            num2 = this._seedArray[index];
        }

        for (var j = 1; j < 5; j++)
        {
            for (var k = 1; k < 0x38; k++)
            {
                this._seedArray[k] -= this._seedArray[1 + ((k + 30) % 0x37)];
                if (this._seedArray[k] < 0)
                {
                    this._seedArray[k] += 0x7fffffff;
                }
            }
        }
        this._inext = 0;
        this._inextp = 0x15;

    },
    internalSample:function()
    {
        var inext = this._inext;
        var inextp = this._inextp;
        if (++inext >= 0x38)
        {
            inext = 1;
        }
        if (++inextp >= 0x38)
        {
            inextp = 1;
        }
        var num = this._seedArray[inext] - this._seedArray[inextp];
        if (num < 0)
        {
            num += 0x7fffffff;
        }
        this._seedArray[inext] = num;
        this._inext = inext;
        this._inextp = inextp;
        return num;
    },
    nextInt:function()
    {
        numRand++;
        return this.internalSample();
    },
    nextNumber:function()
    {
        return this.sample();
    },

    sample:function()
    {
        return (this.internalSample() * 4.6566128752457969E-10);
    },
    getSampleForLargeRange:function()
    {
        var num = this.internalSample();
        if ((this.internalSample() % 2) == 0)
        {
            num = -num;
        }
        var num2 = num;
        num2 += 2147483646.0;
        return (num2 / 4294967293);
    },
    nextMinMax:function(minValue, maxValue)
    {
        if (minValue > maxValue)
        {
            return 0;
        }
        var num = maxValue - minValue;
        if (num <= 0x7fffffff)
        {
            return ((Math.floor(this.sample() * num)) + minValue);
        }
        return ( Math.floor(this.getSampleForLargeRange() * num) + minValue);
    },
});