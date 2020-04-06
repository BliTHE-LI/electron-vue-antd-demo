<template>
  <div id="user-layout" :class="['user-layout-wrapper', device]">
    <div class="main shadow">
      <user-header title="住理" />
      <div class="container">
        <route-view></route-view>
      </div>
    </div>
  </div>
</template>

<script>
import { UserHeader } from '@/components/WindowHeader'
import RouteView from './RouteView'
import mixinDevice from '@/mixins/device'

export default {
    name: 'UserLayout',
    components: { RouteView, UserHeader },
    mixins: [mixinDevice],
    data() {
        return {}
    },
    mounted() {
        document.body.classList.add('userLayout')
    },
    beforeDestroy() {
        document.body.classList.remove('userLayout')
    }
}
</script>

<style lang="less" scoped>
#user-layout {
    height: 100%;
    .shadow {
        box-shadow: 0 0 10px rgba(0, 0, 0, 1);
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }
    .main {
        .container {
            width: 100%;
            height: calc(100% - 40px);
            margin-top: 40px;
            padding: 16px 16px;
            position: relative;
            overflow-y: auto;
            a {
                text-decoration: none;
            }

            .top {
                text-align: center;

                .header {
                    height: 44px;
                    line-height: 44px;

                    .badge {
                        position: absolute;
                        display: inline-block;
                        line-height: 1;
                        vertical-align: middle;
                        margin-left: -12px;
                        margin-top: -10px;
                        opacity: 0.8;
                    }

                    .logo {
                        height: 44px;
                        vertical-align: top;
                        margin-right: 16px;
                        border-style: none;
                    }

                    .title {
                        font-size: 33px;
                        color: rgba(0, 0, 0, 0.85);
                        font-family: Avenir, 'Helvetica Neue', Arial, Helvetica,
                            sans-serif;
                        font-weight: 600;
                        position: relative;
                        top: 2px;
                    }
                }
                .desc {
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.45);
                    margin-top: 12px;
                    margin-bottom: 40px;
                }
            }

            .main {
                min-width: 260px;
                width: 368px;
                margin: 0 auto;
            }

            .footer {
                position: absolute;
                width: 100%;
                bottom: 0;
                padding: 0 16px;
                margin: 48px 0 24px;
                text-align: center;

                .links {
                    margin-bottom: 8px;
                    font-size: 14px;
                    a {
                        color: rgba(0, 0, 0, 0.45);
                        transition: all 0.3s;
                        &:not(:last-child) {
                            margin-right: 40px;
                        }
                    }
                }
                .copyright {
                    color: rgba(0, 0, 0, 0.45);
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
