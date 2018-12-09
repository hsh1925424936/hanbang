<div class="main-left-tab">
    <div class="logo"></div>
    <ul>
        {{#if data}}
        {{#each data}}
            <li data-tpl="{{tpl}}" data-parent="{{parent}}" class="{{#if selected}}selected{{/if}}">
                <span>{{name}}</span>
                <span>&gt;</span>
            </li>
        {{/each}}
        {{/if}}
    </ul>
</div>