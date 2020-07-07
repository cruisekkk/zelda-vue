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
        <p><span v-if='this.$sidebar.products.includes(name)' class="product"></span>{{name}}</p>
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
<style>
span {
    margin-left: 32px;
}
#left {
    padding-left: 200px;
}

</style>

