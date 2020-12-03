<template>
  <div class="app-container">
     <div >
         <el-row>
             <el-col :span='2'  :push= '0'>
                <el-button class="filter-item" style="margin-left: 10px; margin-bottom: 20px" type="warning" size="medium">
                起始/截止日期
               </el-button>  
            </el-col>
            <el-col :span='2' style="margin-left:50px; ">
              <div class="block">
                <el-date-picker
                  v-model="listQuery.stockDate"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="起始日期"
                  end-placeholder="截止日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </div>
            </el-col>
           <el-col :span='2'  style="margin-left: 250px; margin-bottom: 10px">
                <el-button class="filter-item" style="margin-left: 20px;" type="success" plain  size="medium">
                产线
               </el-button>  
            </el-col>
            <el-col :span='2'  style="margin-left: 10px; margin-bottom: 10px">
            <el-select v-model="listQuery.productionline" placeholder="请选择" clearable style="height:20px; width: 250px" class="filter-item">
                <el-option v-for="item in productionlineOptions" :key="item" :label="item" :value="item" />
            </el-select>
            </el-col>
              <el-col :span='2'  style="margin-left: 150px; margin-bottom: 10px">
                <el-button class="filter-item" style="margin-left: 20px;" type="success" plain size="medium">
                产品
               </el-button>  
            </el-col>
            <el-col  :span='2' style="margin-left: 10px;">
            <el-select v-model="listQuery.production" placeholder="请选择" clearable class="filter-item" style="width: 250px">
                <el-option v-for="item in productionOptions" :key="item" :label="item" :value="item" />
            </el-select>
            </el-col>
            
           
         </el-row>
       <el-row >  
          <el-col :span='2'  style="margin-left: 10px; margin-bottom: 10px">
                <el-button class="filter-item" style="margin-left: 0px;" type="success" plain size="medium">
                类型
               </el-button>  
            </el-col>
        <el-col :span='2' style="margin-left: 0px;">
            <el-select v-model="listQuery.type" placeholder="请选择" clearable style="width: 250px" class="filter-item">
                <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" />
            </el-select>
        </el-col>
        <el-col :span='2'  :push= '15'>
                <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-zoom-in" @click="handleFilter">
                生成
            </el-button>  
        </el-col>
       
        <el-col :span='2'  :push= '15' style="margin-left: 10px;" >  
            <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"  @click="handleDownload">
                {{ $t('table.export') }}
            </el-button>
        </el-col>
    </el-row>

       <div class="chart-container">
    <LineMarker height="100%" width="100%" />
  </div>
    

   
  </div>

  </div>
</template>


<script>
import { getList,createArticle, updateArticle, search } from '@/api/faction'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import LineMarker from './LineMarker'




export default { 
  name:'TimingData',
  components: { LineMarker },
  directives: { waves },
  data() {
    return {
      list:null,    
      listLoading: false,
      total:0,
      listQuery:{
        stockDate:'',
        productionline: '',
        production: '',
        type:'',
        year:'',
        month:'',
        area:''

      },
      productionlineOptions:['1号区','2号区','3号区','4号区','5号区','6号区','7号区','8号区','9号区','10号区','不良区'],
      productionOptions:['南瓜','玉米','豆角','菠菜'],
      typeOptions:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
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