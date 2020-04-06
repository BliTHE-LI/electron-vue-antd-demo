<template>
    <div style="background-color: #F5F5F5; padding: 24px;">
        <a-page-header :ghost="false" @back="() => $router.go(-1)" :title="title">
            <template slot="extra">
                <a-icon class="extra" type="down" />
                <a-icon class="extra" type="minus" />
                <a-icon class="extra" type="close" />
            </template>
        </a-page-header>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        logo: String
    }
};
</script>
<style lang="less" scoped>
.base-header {
    /*解决无边框样式无法拖动的问题*/
    -webkit-app-region: drag;
    border: 1px solid rgb(235, 237, 240);
    height: 46px;
    width: 100%;
    flex: 0 1 auto;
    background-color: #1890ff;
    color: #fff !important;
    line-height: 46px;
    user-select: none;
}
</style>
