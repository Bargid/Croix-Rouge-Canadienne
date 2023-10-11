                    <!-- <div class="no-dates-container"
                    v-if="selectedEndDate !== '' && selectedFilters.length == 0"
                    v-for="course in filteredCourses"
                    v-bind:key="course.id">
                    <strong>juste les dates</strong>
                    <p> Title : {{ course.title }}</p>
                    <p> Date : {{ course.date }}</p>
                    <p> Language : {{ course.language }}</p>
                    <p> Certification : {{ course.certification }}</p>
                    <p> Delivery Method : {{ course.deliveryMethod }}</p>
                </div>
                <div v-else>
                    <div v-if="!subGroupExists" v-for="course in CourseTypeMatching" v-bind:key="course.id">
                        <strong>1er groupe</strong>
                        <p> Title : {{ course.title }}</p>
                        <p> Date : {{ course.date }}</p>
                        <p> Language : {{ course.language }}</p>
                        <p> Certification : {{ course.certification }}</p>
                        <p> Delivery Method : {{ course.deliveryMethod }}</p>
                    </div>
                    <div v-if="!subGroupChoiceExists" v-for="course in subGroupMatching" v-bind:key="course.id">
                        <strong>2eme groupe</strong>
                        <p> Title : {{ course.title }}</p>
                        <p> Date : {{ course.date }}</p>
                        <p> Language : {{ course.language }}</p>
                        <p> Certification : {{ course.certification }}</p>
                        <p> Delivery Method : {{ course.deliveryMethod }}</p>
                    </div>
                    <div v-if="!subGroupChoiceDetailExists" v-for="course in subGroupChoiceMatching" v-bind:key="course.id">
                        <strong>3eme groupe</strong>
                        <p> Title : {{ course.title }}</p>
                        <p> Date : {{ course.date }}</p>
                        <p> Language : {{ course.language }}</p>
                        <p> Certification : {{ course.certification }}</p>
                        <p> Delivery Method : {{ course.deliveryMethod }}</p>
                    </div>
                    <div v-for="course in subGroupChoiceDetailMatching" v-bind:key="course.id">
                        <strong>4eme groupe</strong>
                        <p> Title : {{ course.title }}</p>
                        <p> Date : {{ course.date }}</p>
                        <p> Language : {{ course.language }}</p>
                        <p> Certification : {{ course.certification }}</p>
                        <p> Delivery Method : {{ course.deliveryMethod }}</p>
                    </div>
                </div> -->