<template>
  <div class="app-container">
     <div >
         <el-row>
             <el-col :span='2'  :push= '0'>
                <el-button class="filter-item" style="margin-left: 10px; margin-bottom: 20px" type="warning" size="medium">
                当前日期
               </el-button>  
            </el-col>
            <el-col :span='2' style="margin-left:10px; ">
            <el-date-picker
                v-model="stockDate"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
            </el-date-picker>
            </el-col>
           <el-col :span='2'  style="margin-left: 120px; margin-bottom: 10px">
                <el-button class="filter-item" style="margin-left: 20px;" type="success" plain  size="medium">
                年份
               </el-button>  
            </el-col>
            <el-col :span='2'  style="margin-left: 10px; margin-bottom: 10px">
            <el-select v-model="listQuery.year" placeholder="请选择" clearable style="height:20px; width: 150px" class="filter-item">
                <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item" />
            </el-select>
            </el-col>
              <el-col :span='2'  style="margin-left: 50px; margin-bottom: 10px">
                <el-button class="filter-item" style="margin-left: 20px;" type="success" plain size="medium">
                月份
               </el-button>  
            </el-col>
            <el-col  :span='2' style="margin-left: 10px;">
            <el-select v-model="listQuery.month" placeholder="请选择" clearable class="filter-item" style="width: 150px">
                <el-option v-for="item in monthOptions" :key="item" :label="item" :value="item" />
            </el-select>
            </el-col>
             <el-col :span='2'  style="margin-left: 70px; margin-bottom: 10px">
                <el-button class="filter-item" style="margin-left: 4px;" type="success" plain size="medium">
                区域
               </el-button>  
            </el-col>
            <el-col  :span='2'  style="margin-left: 5px;">
            <el-select v-model="listQuery.area"  placeholder="请选择" clearable style="width: 200px" class="filter-item">
                <el-option v-for="item in areaOptions" :key="item" :label="item" :value="item" />
            </el-select>
            </el-col>
           
         </el-row>
       <el-row >  
          <el-col :span='2'  style="margin-left: 10px; margin-bottom: 10px">
                <el-button class="filter-item" style="margin-left: 0px;" type="success" plain size="medium">
                品种
               </el-button>  
            </el-col>
        <el-col :span='2' style="margin-left: 0px;">
            <el-select v-model="listQuery.variety" placeholder="请选择" clearable style="width: 250px" class="filter-item">
                <el-option v-for="item in varietyOptions" :key="item" :label="item" :value="item" />
            </el-select>
        </el-col>
        
        <el-col :span='2' style="margin-bottom:30px;" :push= '9' >
            <el-input v-model="listQuery.name" placeholder="排号" style="width: 250px;" class="filter-item" @keyup.enter.native="handleFilter"/>
        </el-col>
        <el-col :span='2'  :push= '12'>
                <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-zoom-in" @click="handleFilter">
                生成
            </el-button>  
        </el-col>
       
        <el-col :span='2' style="margin-left: 650px;">  
            <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"  @click="handleDownload">
                {{ $t('table.export') }}
            </el-button>
        </el-col>
    </el-row>

       <div class="chart-container">
    <chart height="100%" width="100%" />
  </div>
    

    </div>
<!--  dsada -->
    <el-table
      v-loading="listLoading"
      :data="list"       
      border
      fit
      highlight-current-row
    >
    
       <el-table-column label="id" align="center">
        <template slot-scope="{row}">
          {{ row.id }}
        </template>
      </el-table-column>   
      <el-table-column label="name">
        <template slot-scope="{row}">
          {{row.name }}
        </template>
      </el-table-column>  
       <el-table-column label="demo">
        <template slot-scope="{row}">
          {{ row.demo }}
        </template>
      </el-table-column> 
       <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row,$index)">
            编辑
          </el-button>
          <el-button  size="mini" type="danger" @click="deletefac(row)" >
            删除
          </el-button>
        </template>
      </el-table-column>     
       </el-table>  

       <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />

<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"  :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;"> 
        <el-form-item label="名称" >
          <el-input v-model="temp.name" />
        </el-form-item>
         <el-form-item label="简介" >
          <el-input v-model="temp.demo" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>


<script>
import { getList,createArticle, updateArticle, search } from '@/api/faction'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { parseTime } from '@/utils'
import Chart from '@/components/Charts/LineMarker'



export default { 
  name:'TimingData',
  components: { Pagination , Chart },
  directives: { waves },
  data() {
    return {
      list:null,    
      listLoading: false,
       total:0,
      stockDate:this.getNowTime(),
      listQuery:{
        page: 1,
        limit: 20,
        name: '',
        demo: '',
        variety:'',
        year:'',
        month:'',
        area:''

      },
      varietyOptions:['南瓜','玉米','豆角','菠菜'],
      yearOptions:['2018年','2019年','2020年','2021年'],
      monthOptions:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
      areaOptions:['1号区','2号区','3号区','4号区','5号区','6号区','7号区','8号区','9号区','10号区','不良区'],
       pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        temp: [],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        downloadLoading: false,
       
        
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading=true;
      getList(this.listQuery).then(res=>{ 
        this.list=res.data;
        this.total=res.total;
        this.listLoading=false;
        console.log(this.list);
        console.log(this.total);
      })
      
    },
      handleFilter() {
      this.listQuery.page = 1
      this.listLoading=true
      search(this.listQuery.name).then(res=>{
        this.list=res.data
        this.total=res.total;
        this.listLoading=false
      })
    },
    deletefac(row){
      var vm=this;
     this.$axios.delete('https://localhost:44338/factions?id='+row.id)
     .then(res=>{
         vm.$message.success('删除成功');
         vm.fetchData(); 
     }).catch(error=>{
       vm.$message.error('删除失败了哦')
     });
    }, 
     getNowTime() {
	       var now = new Date();
	       var year = now.getFullYear(); //得到年份
	       var month = now.getMonth(); //得到月份
	       var date = now.getDate(); //得到日期
	       var hour =" 00:00:00"; //默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
	       month = month + 1;
	       month = month.toString().padStart(2, "0");
	       date = date.toString().padStart(2, "0");
	       var defaultDate = `${year}-${month}-${date}${hour}`;
	       console.log(defaultDate)
	       return defaultDate;
	       this.$set(this.stockDate, "stockDate", defaultDate);
	    },
     resetTemp() {
      this.temp = {
        id:"",
        name:'',
        demo:''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    createData() {
          createArticle(this.temp.name,this.temp.demo).then(res => {
            this.temp=res.data
            this.dialogFormVisible = false
            this.list.push(this.temp)//实时更新数据在列表末尾
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
    
        },
      handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj 
      this.dialogStatus = 'update'
      this.dialogFormVisible = true  
      console.log(this.temp)
     
    },
    updateData() {
           
          updateArticle(this.temp.id,this.temp.name,this.temp.demo).then(() => {
            console.log(this.temp)
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false 
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        } ,
   handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['name', 'demo']
        const filterVal = ['name', 'demo']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    },
     
    }
    
  

</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
  margin-bottom:10px;
}
</style>