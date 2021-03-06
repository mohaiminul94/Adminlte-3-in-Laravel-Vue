<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card" v-if="$gate.isAdmin()">
          <div class="card-header">
            <h3 class="card-title">Users Table</h3>

            <div class="card-tools">
              <button class="btn btn-success" @click="openModal">
                Add New
                <i class="fas fa-user-plus"></i>
              </button>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Registered at</th>
                  <th>Modify</th>
                </tr>

                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.name | upText }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.type | upText }}</td>
                  <td>{{ user.created_at | dateFormat }}</td>
                  <td>
                    <a href="#" style="margin-right:5px;" @click="editModal(user)">
                      <i class="fa fa-edit"></i>
                    </a>
                    <a href="#" @click="deleteUser(user.id)">
                      <i class="fa fa-trash red"></i>
                    </a>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" v-show="!editMode" >Add New User</h5>
            <h5 class="modal-title" id="exampleModalLabel" v-show="editMode">Update Users Info</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="editMode ? updateUser() : createUser()">
          <div class="modal-body">
            <div class="form-group">
              <input
                v-model="form.name"
                type="text"
                name="name"
                placeholder="Name"
                class="form-control"
                :class="{ 'is-invalid': form.errors.has('name') }"
              >
              <has-error :form="form" field="name"></has-error>
            </div>

            <div class="form-group">
              <input
                v-model="form.email"
                type="email"
                name="email"
                placeholder="Email Address"
                class="form-control"
                :class="{ 'is-invalid': form.errors.has('email') }"
              >
              <has-error :form="form" field="email"></has-error>
            </div>

            <div class="form-group">
              <textarea
                v-model="form.bio"
                name="bio"
                id="bio"
                placeholder="Short bio for user (Optional)"
                class="form-control"
                :class="{ 'is-invalid': form.errors.has('bio') }"
              ></textarea>
              <has-error :form="form" field="bio"></has-error>
            </div>

            <div class="form-group">
              <select
                name="type"
                v-model="form.type"
                id="type"
                class="form-control"
                :class="{ 'is-invalid': form.errors.has('type') }"
              >
                <option value>Select User Role</option>
                <option value="admin">Admin</option>
                <option value="user">Standard User</option>
                <option value="author">Author</option>
              </select>
              <has-error :form="form" field="type"></has-error>
            </div>

            <div class="form-group">
              <input
                v-model="form.password"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                class="form-control"
                :class="{ 'is-invalid': form.errors.has('password') }"
              >
              <has-error :form="form" field="password"></has-error>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" v-show="!editMode" >Create User</button>
            <button type="submit" class="btn btn-primary" v-show="editMode" >Update</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from "vform";

    export default {
    mounted() {
        console.log("Users Component mounted.");
    },

    data() {
        return {
        editMode: false,            
        users: {},    
        form: new Form({
            id:"",
            name: "",
            email: "",
            password: "",
            type: "",
            bio: "",
            photo: ""
        })
        };
    },

    methods: {
        createUser() {
            this.$Progress.start()
            this.form.post("api/user")
            .then(() => {
                Fire.$emit('afterCreated');
                $('#exampleModal').modal('hide');
                Toast.fire({
                    type: 'success',
                    title: 'User created successfully'
                });
                this.$Progress.finish();
            })

            .catch(() => {

            })
    
        },

        loadUsers() {
            if (this.$gate.isAdmin()) {
              axios.get("api/user").then(({data}) => this.users = data.data);
            }
        },

        deleteUser(id) {
            Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if(result.value) {
                        this.form.delete('api/user/'+id).then(() => {
                            if (result.value) {
                            Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                            )
                            Fire.$emit('afterCreated');
                        }
                    }).catch(() => {
                        Swal.fire("Faild!","There was something wrong","warning");
                    })
                }
            })
        },

        openModal() {
            this.editMode= false;
            this.form.reset();
            $('#exampleModal').modal('show');
        },
        
        editModal(user) {
            this.editMode= true;
            this.form.reset();
            $('#exampleModal').modal('show');
            this.form.fill(user);
        },

        updateUser() {
            this.$Progress.start();
            this.form.put('api/user/'+this.form.id)
            .then(() => {
                Fire.$emit('afterCreated');
                $('#exampleModal').modal('hide');
                Swal.fire(
                'Updated!',
                'Your information has been updated.',
                'success'
                )
                this.$Progress.finish();
            })
            .catch(() => {
                this.$Progress.fail();
            })
        },

    },

    created() {
        this.loadUsers();
        Fire.$on('afterCreated', () => {
            this.loadUsers();
        });
    },

};
</script>
