<template>
<!-- <@click.native="hideSidebar"> -->
  <component :is="tag"
             class="nav-item"
             v-bind="$attrs"
             tag="li"
             >
             
    <a class="nav-link left"> 
      <slot>
        <i v-if="icon" :class="icon"></i>
        <p id="p"><span v-if='this.$sidebar.products.includes(name)' class="product"></span>
        {{name}}
        <span v-if='name=="Test Runs" && this.$sidebar.showSub==false'><i id="spinning_icon_left" class="tim-icons"></i></span>
        <span v-if='name=="Test Runs" && this.$sidebar.showSub==true'><i id="spinning_icon_down" class="tim-icons"></i></span>
        </p>

      </slot> 
    </a>
  </component>
</template>
<script>
export default {
  name: "sidebar-link",
  inheritAttrs: false,
  inject: {
    autoClose: {
      default: true
    },
    addLink: {
      default: ()=>{}
    },
    removeLink: {
      default: ()=>{}
    },
  },
  props: {
    name: String,
    icon: String,
    tag: {
      type: String,
      default: "router-link"
    }
  },
  methods: {
    hideSidebar() {
      if (this.autoClose) {
        this.$sidebar.displaySidebar(false);
      } 
    },
    isActive() {
      return this.$el.classList.contains("active");
    },

  },
  mounted() {
    if (this.addLink) {
      this.addLink(this);
    }
  }, 
  beforeDestroy() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    if (this.removeLink) {
      this.removeLink(this);
    }
  }
};
</script>
<style scoped>
#p {
  display: inline-block;
}
#spinning_icon_left::before, #spinning_icon_down::before{
  content:''
}
#spinning_icon_left::after {
  content:'\ea34';
}
 
 #spinning_icon_down::after {
  content:'\ea33';
}

i#spinning_icon_left, i#spinning_icon_down{
  float: right !important;
  transform: scale(0.8) translateX(20px);
}

span {
    margin-left: 32px;
}
#left {
    padding-left: 200px;
}

</style>

