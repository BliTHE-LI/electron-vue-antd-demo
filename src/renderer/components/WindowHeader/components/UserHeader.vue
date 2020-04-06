<template>
  <div class="user-window-header">
    <a-page-header :title="title">
      <template slot="extra">
        <a-button type="link" icon="down" class="extra" title="设置"></a-button>
        <a-button type="link" icon="minus" class="extra" @click="min()" title="最小化"></a-button>
        <a-button type="link" icon="close" class="extra" @click="exit()" title="退出"></a-button>
      </template>
    </a-page-header>
  </div>
</template>
<script>
export default {
    props: {
        title: String,
        logo: String
    },
    methods: {
        exit() {
            // 退出关闭程序
            this.$electron.remote.app.exit()
        },
        min() {
            // 最小化窗口
            this.$electron.remote.getCurrentWindow().minimize()
        }
    }
}
</script>
<style lang="less" scoped>
@LineHeight: 40px;
.user-window-header {
    /*解决无边框样式无法拖动的问题*/
    -webkit-app-region: drag;
    height: 40px;
    width: 100%;
    flex: 0 1 auto;
    background-color: #1890ff;
    line-height: @LineHeight;
    user-select: none;
    position: fixed;
    top: 0;
    left: 0;
    .ant-page-header {
        padding: 0 16px;
        height: 100%;
        line-height: @LineHeight;
        color: #fff !important;
        /deep/.ant-page-header-heading {
            line-height: @LineHeight;
            height: 100%;
            .ant-page-header-back {
                margin: 0 16px 0 0;
                line-height: @LineHeight;
            }
            .ant-page-header-heading-title {
                line-height: @LineHeight;
                color: #fff;
                font-weight: normal;
                font-size: 16px;
            }
            .ant-page-header-heading-extra {
                display: inline-block;
                width: auto;
                padding: 0;
                float: right;
                .ant-btn-link {
                    -webkit-app-region: no-drag;
                    cursor: pointer;
                    color: #fff !important;
                    margin: 0;
                    font-size: 12px;
                    width: 26px;
                }
            }
        }
    }
}
</style>
