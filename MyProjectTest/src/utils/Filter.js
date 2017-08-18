/**
 * Created by Tomorow on 6/10/2016.
 */

var Filter = {
    programs:{},

    normal: function(sprite){
        var program = sprite.getShaderProgram();
        if(program){
            //sprite._getGrayShaderProgram().reset();
        }
    },
    /**
     *
     * @param sprite
     */
    grayScale: function (sprite) {
        var program = Filter.programs["grayScale"];
        if(!program){
            program = new cc.GLProgram("res/shaders/gray.vsh", "res/shaders/gray.fsh");
            //program.initWithVertexShaderFilename("res/shaders/gray.vsh", "res/shaders/gray.fsh");
            program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
            program.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
            program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
            program.link();
            program.updateUniforms();
            //Filter.programs["grayScale"] = program;
        }
        gl.useProgram(program.getProgram());
        sprite.setShaderProgram(program);
    },

    /**
     *
     * @param sprite
     * @param degree
     */
    sepia: function (sprite, degree) {
        var program = Filter.programs["sepia"+degree];
        if(!program){
            program = new cc.GLProgram("res/shaders/sepia2.vsh", "res/shaders/sepia2.fsh");
            //program.initWithVertexShaderByteArray(Filter.DEFAULT_VERTEX_SHADER, Filter.SEPIA_FRAGMENT_SHADER);
            program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
            //program.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
            program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
            program.link();
            program.updateUniforms();

            gl.useProgram(program.getProgram());

            var degreeLocation = program.getUniformLocationForName("u_degree");
            program.setUniformLocationWith1f(degreeLocation, degree);
            program.setUniformsForBuiltins()
            //Filter.programs["sepia"+degree] = program;
        }

        sprite.setShaderProgram(program);
    }
};