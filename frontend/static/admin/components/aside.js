export default function aside() {
        return `
        <aside class="left-sidebar">
        <div>
          <div class="brand-logo d-flex align-items-center justify-content-between">
            <a href="/index.html" class="text-nowrap logo-img"  data-link>
              <img src="/static/assets/images/logos/dark-logo.svg" width="180" alt="" />
            </a>
            <div class="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
              <i class="ti ti-x fs-8"></i>
            </div>
          </div>
          <nav class="sidebar-nav scroll-sidebar" data-simplebar="">
            <ul id="sidebarnav">
              <li class="nav-small-cap">
                <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span class="hide-menu">Home</span>
              </li>
              <li class="sidebar-item">
                <a class="sidebar-link" href="/" aria-expanded="false" data-link>
                  <span>
                    <i class="ti ti-layout-dashboard"></i>
                  </span>
                  <span class="hide-menu">Dashboard</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a class="sidebar-link" href="/user" aria-expanded="false" data-link> 
                  <span style="pointer-events: none">
                    <i class="ti ti-user"></i>
                  </span >
                  <span style="pointer-events: none" class="hide-menu">User</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a class="sidebar-link" href="/category" aria-expanded="false" data-link > 
                  <span style="pointer-events: none">
                    <i class="fa fa-th-list" aria-hidden="true"></i>
                  </span>
                  <span style="pointer-events: none" class="hide-menu">Category</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a class="sidebar-link" href="/product" aria-expanded="false" data-link > 
                  <span style="pointer-events: none">
                    <i class="fa fa-product-hunt" aria-hidden="true"></i>
                  </span>
                  <span style="pointer-events: none" class="hide-menu">Product</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a class="sidebar-link" href="/order" aria-expanded="false" data-link > 
                  <span style="pointer-events: none">
                    <i class="fa fa-credit-card-alt" aria-hidden="true"></i>
                  </span>
                  <span style="pointer-events: none" class="hide-menu">Orders</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a class="sidebar-link" href="/comments" aria-expanded="false" data-link > 
                  <span style="pointer-events: none">
                    <i class="fa fa-comment-o" aria-hidden="true"></i>
                  </span>
                  <span style="pointer-events: none" class="hide-menu">Comments</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a class="sidebar-link" href="/message" aria-expanded="false" data-link > 
                  <span style="pointer-events: none">
                    <i class="fa fa-comments" aria-hidden="true"></i>
                  </span>
                  <span style="pointer-events: none" class="hide-menu">Message</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a class="sidebar-link" href="/chart" aria-expanded="false" data-link > 
                  <span style="pointer-events: none">
                    <i class="fa fa-line-chart" aria-hidden="true"></i>
                  </span>
                  <span style="pointer-events: none" class="hide-menu">Chart</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
        `;
}



