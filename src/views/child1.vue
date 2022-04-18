<template>
    <div>
        <micro-app 
        name="lhzh"
        url="http://localhost/lhzh/" 
        inline
        disableSandbox
        @mounted="mountedFunc"
        @error="errorFunc"
           ></micro-app>
    </div>
</template>

<script lang="ts" setup>
    const mountedFunc = (e)=>{

    }
    const errorFunc = (e)=>{
        console.log('error: ', e);

    }
</script>