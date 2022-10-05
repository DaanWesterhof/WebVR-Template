//a variable to check if the player is already teleporting
var lastTime = 0

/**
 * A component to create a teleporter. This component generates a few primitives and a button. 
 * By setting its id and target you can teleport between teleporters by pressing the button.
 */
AFRAME.registerComponent('sneeuwpop',{
    /**
     * teleporter_id the id of this teleporter
     * targer_id the id of the target teleporter/ to wich teleporter do you want to teleport.
     */
    schema: {
        animate: {default: false}
      },
    /**
     * Initialisation function of the component
     * This function adds the base, top, button, button pilar and tube as child entities to the entity. 
     * It sets the properties of these entities and adds the correctt event listeners and animations
     */
    init: function(){
        this.home_position = new THREE.Vector3();
        
        this.el.classList.add("clickable");
        this.el.addEventListener("mousedown", this.change_state.bind(this))


        var legs = document.createElement("a-sphere")
        legs.setAttribute("position", "0 0.75 0")
        legs.setAttribute("radius",  "0.5")
        legs.setAttribute("color", "#FFFFFF")
        this.el.appendChild(legs)

        var chest = document.createElement("a-sphere")
        chest.setAttribute("position", "0 1.4 0")
        chest.setAttribute("radius",  "0.3")
        chest.setAttribute("color", "#FFFFFF")


        var button = document.createElement("a-sphere")
        button.setAttribute("position", "0 0 0.3")
        button.setAttribute("color", "#000000")
        button.setAttribute("radius", "0.05")
        chest.appendChild(button)

        var button2 = document.createElement("a-sphere")
        button2.setAttribute("position", "0 0.1 0.28")
        button2.setAttribute("color", "#000000")
        button2.setAttribute("radius", "0.05")
        chest.appendChild(button2)
        this.el.appendChild(chest)

        var head = document.createElement("a-sphere")
        head.setAttribute("position", "0 1.85 0")
        head.setAttribute("color", "#FFFFFF")
        head.setAttribute("radius", "0.2")


        var nose = document.createElement("a-cone")
        nose.setAttribute("rotation", "90 0 0")
        nose.setAttribute("position", "0 0 0.2")
        nose.setAttribute("radius-bottom", "0.05")
        nose.setAttribute("radius-top", "0.01")
        nose.setAttribute("height", "0.2")
        nose.setAttribute("color", "orange")
        head.appendChild(nose)

        var eye1 = document.createElement("a-sphere")
        eye1.setAttribute("position", "0.1 0 0.17")
        eye1.setAttribute("color", "#000000")
        eye1.setAttribute("radius", "0.02")
        head.appendChild(eye1)

        var eye2 = document.createElement("a-sphere")
        eye2.setAttribute("position", "-0.1 0 0.17")
        eye2.setAttribute("color", "#000000")
        eye2.setAttribute("radius", "0.02")
        head.appendChild(eye2)
        
        this.el.appendChild(head)
        

        

    },

    tick: function () {
        console.log("hallo")
        var nowTime = new Date()
        if(this.data.animate){
            if((nowTime - lastTime) > 1){
                var rotation = this.el.getAttribute("rotation")
                rotation.y += 1
                this.el.setAttribute("rotation", rotation)
                lastTime = new Date()
            }
        }
    },

    /**
     * This function starts the multiple stages of the start animation: teleporter_initiated and teleporter_initiated2
     */
    change_state: function(){
        this.data.animate = !this.data.animate
    }

      
})

/**
 * A wrapper around the teleporter component so you can use it as a entity.
 */
AFRAME.registerPrimitive('a-sneeuwpop', {
    // Attaches the `button` component by default..
    defaultComponents: {
      sneeuwpop: {},
      position: {x:0, y:0, z:0}
    },

    mappings: {
        animate: 'teleporter.animate'
    }
});