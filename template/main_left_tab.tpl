<div class="main-left-tab">
    <div class="logo">
        <h1>
            <span>{{parent}}</span><br>
            <small>{{English}}</small>
        </h1>
        <img src="{{image}}" alt="">
    </div>
    <ul>
        {{#if data}}
        {{#each data}}
            <li data-tpl="{{tpl}}" data-parent="{{parent}}" class="{{#if selected}}selected{{/if}}">
                <span>{{name}}</span>
                <i></i>
            </li>
        {{/each}}
        {{/if}}
    </ul>
</div>