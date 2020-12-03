<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :span="8" class="card-panel-col">
      <div class="card-panel">
        
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日采摘总览  
          </div>
           <el-button class="filter-item" style="margin-left: 0px;" type="success" plain size="medium">
              {{today_sum+'KG'}}
           </el-button>  
        </div>
      </div>
    </el-col>
    <el-col :span="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
     
        <div class="card-panel-description">
          <div class="card-panel-text">
            一号线投料总览
            
          </div>
           <el-button class="filter-item" style="margin-left: 0px;" type="success" plain size="medium">
             {{line1_liao_num+'KG'}}
           </el-button>  
            <el-button class="filter-item" style="margin-left: 20px;" type="primary" plain size="medium">
             {{line1_liao_box_num+'  '+'箱'}}
           </el-button>  
        </div>
      </div>
    </el-col>
    <el-col :span="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        
        <div class="card-panel-description">
          <div class="card-panel-text">
            一号线小盒总览
          </div>
          <div class="progress-item">
            <el-button class="filter-item" style="margin-left: 0px;" type="success" plain size="medium">
            {{'合格：'+line1_s_num+'KG'+' '+line1_s_box_num+'盒'}}
           </el-button>  
            <el-button class="filter-item" style="margin-left: 20px;" type="danger" plain size="medium">
            {{'不合格：'+line1_s_false_num+'KG'+' '+line1_s_box_num+'盒'}}
           </el-button>  
       </div>
        </div>
      </div>
    </el-col>
    <el-col :span="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        
        <div class="card-panel-description">
          <div class="card-panel-text">
            一号线整箱
          </div>
           <div class="progress-item">
               <el-button class="filter-item" style="margin-left: 0px;" type="success" plain size="medium">
               {{'合格：'+line1_num+'KG'+' '+line1_box_num+'箱'}}
              </el-button>  
                <el-button class="filter-item" style="margin-left: 20px;" type="danger" plain size="medium">
                {{'不合格：'+line1_false_num+'KG'+' '+line1_false_box_num+'箱'}}
              </el-button>  
           </div>
        </div>
      </div>
    </el-col>
    <el-col :span="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
       
        <div class="card-panel-description">
          <div class="card-panel-text">
            一号线垛量总览
            
          </div>
           <el-button class="filter-item" style="margin-left: 0px;" type="warning" plain size="medium">
            {{line1_duo_num+'垛'}}
           </el-button>  
        </div>
      </div>
    </el-col>
    <el-col :span="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        
        <div class="card-panel-description">
          <div class="card-panel-text">
            一号线总产量总览
            
          </div>
           <el-button class="filter-item" style="margin-left: 0px;" type="success" plain size="medium">
             {{line1_sum+'KG'}}
           </el-button>  
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  data(){
    return{
      today_sum:10,
      line1_liao_num:10,
      line1_liao_box_num:5,
      line1_s_num:5,
      line1_s_box_num:5,
      line1_s_false_num:5,
      line1_s_box_num:5,
      line1_num:5,
      line1_box_num:5,
      line1_false_num:5,
      line1_false_box_num:5,
      line1_duo_num:5,
      line1_sum:5,
      

    }

  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
    
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, 0);

    
    .card-panel-description {
      float: left;
      font-weight: bold;
      margin: 26px;
      margin-left: 10px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 20px;
        margin-bottom: 12px;
        
      }
    
      .progress-item{
        margin:10px 5px 15px 0px;
      }

     
    }
  }
}


</style>
