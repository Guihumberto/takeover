<template>
    <div class="arealist">
        <div class="title">
            <h2 class="d-flex justify-center align-center"><v-icon size="2rem" class="mr-2">mdi-tag</v-icon>Lista de Tags</h2>
            <addTag refId="1" />
        </div>
        <div id="cards">
            <div class="card" v-for="item, i in listTags" :key="i" @click="showActionActive(item.id)">
                <div class="card-border"></div>
                <div class="card-content">
                  <div class="wrappercontent">
                      <div>
                          <h3>{{item.tag_name}}</h3>
                          <small class="font-weight-thin text-grey">{{item.description}}</small>
                      </div>
                    </div>
                </div>
                <v-expand-transition>
                  <div class="actionsCard" v-if="showAction == item.id">
                    <confirmarDialog :type="1" :idRemove="item.id" @excluir="removerTag($event)"  />
                    <addTag refId="2" :tagEdit="item" />
                  </div>
                </v-expand-transition>
            </div>
        </div>
    </div>
</template>

<script>
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

    export default {
        data(){
            return{
                showAction: null,
                idRemove: null
            }
        },
        computed:{
            listTags(){
              return appStore.readListTags
            }
        },
        methods:{
          showActionActive(item){
            if(this.showAction == item) {
              this.showAction = null
            } else {
              this.showAction = item
            }
          },
          removerTag(item){
            appStore.deleteTag(item)
          }
        },
        mounted(){
            document.getElementById("cards").onmousemove = e => {
            for(const card of document.getElementsByClassName("card")) {
                const rect = card.getBoundingClientRect(),
                    x = e.clientX - rect.left,
                    y = e.clientY - rect.top;

                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            };
            }
        }
    }
</script>

<style lang="scss" scoped>
.arealist{
    width: 100%;
    transition: 1s ease;
    animation: slideRight 1s ease forwards;
}
.title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
}
#cards{
  width: min(100%, 916px);
  margin-inline: auto;
  justify-content: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
}
#cards:hover > .card > .card-border {
  opacity: 1;
}
.card{
  background-color: rgba(255, 255, 255, 0.1);
  width: 200px;
  height: 140px;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
}
.card::before,
.card > .card-border{
  border-radius: inherit;
  content: '';
  height: 100%;
  left: 0px;
  opacity: 0;
  transition: opacity 500ms;
  position: absolute;
  top: 0px;
  width: 100%;
}
.card::before{
  background: radial-gradient(
    800px circle at var(--mouse-x) var(--mouse-y),
    rgba(255, 255, 255, 0.06),
    transparent 40%
  );
  z-index: 3;
}
.card > .card-border{
  background: radial-gradient(
    400px circle at var(--mouse-x) var(--mouse-y),
    rgba(255, 255, 255, 0.3),
    transparent 40%
  );
  z-index: 1;
}
.card:hover::before
{
  opacity: 1;
}
.card > .card-content{
  background: var(--card-color);
  border-radius: inherit;
  margin: 1px;
  position: relative;
  height: calc(100% - 2px);
  width: calc(100% - 2px);
  z-index: 2;
}
.btn-group a{
  background: var(--primary-color);
  padding: .5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  color: white;
  transition: .6s ease;
  border: 1px solid var(--primary-color);
}
.btn-group a:hover{
  border: 1px solid var(--primary-color);
  background: var(--bg-color);
  color: var(--primary-color);
}
.wrappercontent{
  margin: 0 1rem;
  padding: 1rem 0 0 0;
  display: flex;
  justify-content: left;
  align-items: baseline;
  gap: .8rem;
  line-height: 1.2;
  height: 30%;
}
.card-content .img{
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.actionsCard{
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: -48px;
  z-index: 5;
}
</style>