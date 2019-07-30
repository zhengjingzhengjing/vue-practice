<template>
  <div>
    <!-- 联系人列表 -->
    <van-contact-list
      :list="list"
      @add="onAdd"
      @edit="onEdit"
    />
    <!-- 联系人编辑  :is-edit="isEdit" 是新建还是编辑 isEdit=false是新建  isEdit=true是编辑-->
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script>
import { Button, ContactList, Toast, ContactEdit, Popup } from 'vant'
import axios from 'axios'
export default {
  name: 'contactList',
  components: {
    [Button.name]: Button,
    [ContactList.name]: ContactList,
    [ContactEdit.name]: ContactEdit,
    [Popup.name]: Popup
  },
  data () {
    return {
      list: [],
      instance: null, // 声明挂载实例
      showEdit: false, // 编辑弹框是否可见
      editingContact: {}, // 正在编辑的联系人的数据
      isEdit: false // 新建
    }
  },
  created () {
    this.instance = axios.create({
      baseURL: 'http://localhost:9000/api',
      timeout: 1000
    })
    this.getList()
  },
  methods: {
    // 获取联系人
    getList () {
      this.instance.get('/contactList').then(res => {
        if (res.data.code === 200) {
          this.list = res.data.data
        }
      }).catch(() => {
        Toast('请求失败，请稍后重试')
      })
    },
    // 添加联系人 只是控制弹框的显隐
    onAdd () {
      this.showEdit = true
      this.isEdit = false
    },
    // 编辑联系人  只是控制弹框的显隐
    onEdit (info) {
      this.showEdit = true
      this.isEdit = true
      this.editingContact = info
    },
    // 保存联系人
    onSave (info) {
      // 判断是新建false还是编辑true
      if (this.isEdit) {
        // 编辑
        this.instance.put('/contact/edit', info)
          .then(res => {
            if (res.data.code === 200) {
              Toast('保存成功')
              this.showEdit = false
              this.getList()
            }
          })
          .catch(() => {
            Toast('请求失败，请稍后重试')
          })
      } else {
        // 新建
        this.instance.post('/contact/new/json', info)
          .then(res => {
            if (res.data.code === 200) {
              Toast('保存成功')
              this.showEdit = false
              // 重新获取列表
              this.getList()
            }
          })
          .catch(() => {
            Toast('请求失败，请稍后重试')
          })
      }
    },
    // 删除联系人
    onDelete (info) {
      this.instance.delete('/contact', {
        params: {
          id: info.id
        }
      }).then(res => {
        if (res.data.code === 200) {
          Toast('删除成功')
          this.getList()
          this.showEdit = false
        }
      }).catch(() => {
        Toast('请求失败，请稍后重试')
      })
    }
  }
}
</script>

<style scoped="scoped">
.van-popup {
  height: 40%;
}
.van-contact-list__add {
  z-index: 0;
}
</style>
