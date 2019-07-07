<?php

	class PFM_AdminPage
	{


		public function AdminView()
		{?>
			<div class="bs-wrapper">
				<div class="container-fluid">
					<div class="row">
						<div class="col-sm-12">
							<div id="accordion">

							</div>
							<input type="hidden" name="fontCounter" value="0">
							<div id="alertBox"></div>
							<button type="button" class="btn btn-primary" id="addFont"><?php _e('+ Add Font','pfm_fontManager');?></button>
							<button type="button" class="btn btn-success" id="save"><?php _e('Save Changes','pfm_fontManager');?></button>

					</div>
			  </div>
			  <div id="loading">
			    <div class="sk-cube-grid">
			      <div class="sk-cube sk-cube1"></div>
			      <div class="sk-cube sk-cube2"></div>
			      <div class="sk-cube sk-cube3"></div>
			      <div class="sk-cube sk-cube4"></div>
			      <div class="sk-cube sk-cube5"></div>
			      <div class="sk-cube sk-cube6"></div>
			      <div class="sk-cube sk-cube7"></div>
			      <div class="sk-cube sk-cube8"></div>
			      <div class="sk-cube sk-cube9"></div>
			    </div>
			  </div>
			</div>

		<?php
		}
	}



?>
