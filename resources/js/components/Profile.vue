<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                
            <!-- Widget: user widget style 1 -->
            <div class="card card-widget widget-user">
              <!-- Add the bg color to the header using any of the bg-* classes -->
              <div class="widget-user-header text-white" style="background: url('./images/cover.png') center center;">
                <h3 class="widget-user-username">Elizabeth Pierce</h3>
                <h5 class="widget-user-desc">Web Designer</h5>
              </div>
              <div class="widget-user-image">
                <img class="img-circle" src="/images/propic.jpg" alt="User Avatar">
              </div>
              <div class="card-footer">
                <div class="row">
                  <div class="col-sm-4 border-right">
                    <div class="description-block">
                      <h5 class="description-header">3,200</h5>
                      <span class="description-text">SALES</span>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                  <div class="col-sm-4 border-right">
                    <div class="description-block">
                      <h5 class="description-header">13,000</h5>
                      <span class="description-text">FOLLOWERS</span>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                  <div class="col-sm-4">
                    <div class="description-block">
                      <h5 class="description-header">35</h5>
                      <span class="description-text">PRODUCTS</span>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                </div>
                <!-- /.row -->
              </div>
            </div>
            <!-- /.widget-user -->
          
            <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="activity-tab" data-toggle="tab" href="#activity" role="tab" aria-controls="home" aria-selected="true">Activity</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="setting-tab" data-toggle="tab" href="#setting" role="tab" aria-controls="profile" aria-selected="false">Settings</a>
            </li>
            </ul>
            <div style="margin:20px 100px;">
                <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="activity" role="tabpanel" aria-labelledby="activity-tab">
                <h1 style="text-align:center;">Display User Activity</h1>
            </div>
            <div class="tab-pane fade" id="setting" role="tabpanel" aria-labelledby="setting-tab">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label for="inputName" class="col-sm-2 control-label">Name</label>

                        <div class="col-sm-12">
                        <input type="text" v-model="form.name" class="form-control" id="inputName" placeholder="Name" >
                            <has-error :form="form"  field="name"></has-error>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail" class="col-sm-2 control-label">Email</label>

                        <div class="col-sm-12">
                        <input type="email" v-model="form.email" class="form-control" id="inputEmail" placeholder="Email"  >
                            <has-error :form="form" field="email"></has-error>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="inputExperience" class="col-sm-2 control-label">Experience</label>

                        <div class="col-sm-12">
                        <textarea   class="form-control" id="inputExperience" placeholder="Experience"></textarea>
                            <has-error :form="form" field="bio"></has-error>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="photo" class="col-sm-2 control-label">Profile Photo</label>
                        <div class="col-sm-12">
                            <input type="file" @change="uploadPropic"  name="photo" class="form-input">
                        </div>

                    </div>

                    <div class="form-group">
                        <label for="password" class="col-sm-12 control-label">Passport (leave empty if not changing)</label>

                        <div class="col-sm-12">
                        <input type="password"
                            class="form-control"
                            id="password"
                            placeholder="Passport"
                            v-model="form.password"
                            
                        >
                            <has-error :form="form" field="password"></has-error>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-12">
                        <button  type="submit" @click.prevent="updateProfile" class="btn btn-success">Update</button>
                        </div>
                    </div>
                </form>
            </div>
            </div>
            </div>


            </div>
        </div>
    </div>
</template>






<script>

import Form from "vform";

    export default {

        mounted() {
            console.log('Profile Component mounted.')
        },

        data() {
            return {
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

        updateProfile() {
            this.$Progress.start();
            this.form.put('api/profile')
            .then(() => {
                this.$Progress.finish();
            })
            .catch(() => {
                this.$Progress.fail();
            })
        },

        uploadPropic(e) {
            let file = e.target.files[0];
            // console.log(file);
            let reader = new FileReader();
            if (file['size'] < 2111775) {
                reader.onloadend = (file) => {
                    // console.log('RESULT', reader.result)
                    this.form.photo= reader.result;
                    }
                reader.readAsDataURL(file);
            }
            else {
                Swal.fire(
                'Oops!',
                'Your uploading more then 2mb file.',
                'error'
                )
            }
        }
    },

    created() {
        axios.get("api/profile").then(({data}) => this.form.fill((data)));
    }

    }
</script>
