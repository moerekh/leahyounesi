$(function(){

    function ly_sort_credits(){
        var pcCredits = [];
        var pmCredits = [];
        var atpCredits = [];
        var atdCredits = [];
        var pCredits = [];
        var drCredits = [];
        var creditArrays = [pcCredits, pmCredits, atpCredits, pCredits, drCredits];

        let my_jobs = [];
        
        $.getJSON(my_spreadsheet_url, function(data) {
            var entry = data.feed.entry;

            // Sort all objects into their own arrays based on myPosition.
            for ( var item in entry ) {
                if (entry[item].gsx$credits.$t) {
                    var myposition = entry[item].gsx$myposition.$t;

                    try {
                        if (!my_jobs.includes(myposition)) {
                            my_jobs.push(myposition);
                            my_jobs.myposition = [];
                        }
                        
                        my_jobs.myposition.push(entry[item]);
                    } catch (e) {
                        console.log(e.message);
                    }

                }
            }

            // Populate the tables.
            function poptables(credits, table){
                for ( var s1 in credits ) {
                        var projectEntry = '<tr><td width="260"><p class="strong">' + credits[s1].gsx$artist.$t + ' - "' + credits[s1].gsx$projecttitle.$t + '"</p class="strong"></td><td width="250"><p class="strong">' + credits[s1].gsx$producer.$t + '</p class="strong"></td><td width="188"><p class="strong">' + credits[s1].gsx$director.$t + '</p class="strong"></td><td width="100"><p class="strong">' + credits[s1].gsx$year.$t + '</p class="strong"></td></tr>';
                        table.append(projectEntry);
                    }
            }
            poptables(pcCredits, $('#productionCoordinator'));
            poptables(pmCredits, $('#productionManager'));
            poptables(atpCredits, $('#assistantToProducer'));
            poptables(atdCredits, $('#assistantToDirector'));
            poptables(pCredits, $('#producer'));
            poptables(drCredits, $('#directorsRep'));

        });
    }
    ly_sort_credits();
});
